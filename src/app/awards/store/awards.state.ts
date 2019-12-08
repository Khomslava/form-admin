import { State, Action, Selector, StateContext, StateOperator } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';

import { throwError, of, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AwardsService } from '../services/awards.service';

import { AwardsStateModel } from './awards.state';
import { IAward } from '../models/awards.model';

import * as AwardsActions from './awards.actions';

export interface AwardsStateModel {
  awards: IAward[];
  selectedAwardId: string;
  loaded: boolean;
  loading: boolean;
}

@State<AwardsStateModel>({
  name: 'awardsState',
  defaults: {
    awards: [],
    selectedAwardId: null,
    loaded: false,
    loading: false
  }
})
export class AwardsState {
  constructor(private awardsService: AwardsService) {}

  @Selector()
  static awards(state: AwardsStateModel) {
    return state.awards;
  }

  @Selector()
  static selectedAward(state: AwardsStateModel): IAward {
    return state.awards.find( award => award.id === state.selectedAwardId);
  }

  // ------------------ Actions -----------------------------

  @Action(AwardsActions.LoadAwards)
  loadAwards({patchState, dispatch}: StateContext<AwardsStateModel>) {
    patchState({loading: true});
    return this.awardsService.getAwards()
      .pipe(
        map( awards => dispatch(new AwardsActions.LoadAwardsSuccess(awards))),
        catchError( error => dispatch(new AwardsActions.LoadAwardsFail()))
      );
  }

  @Action(AwardsActions.LoadAwardsSuccess)
  loadAwardsSuccess({patchState}: StateContext<AwardsStateModel>, action: AwardsActions.LoadAwardsSuccess) {
    patchState({
      awards: action.payload,
      loaded: true,
      loading: false
    });
  }

  @Action(AwardsActions.LoadAwardsFail)
  loadAwardsFail({patchState}: StateContext<AwardsStateModel>) {
    patchState({loaded: false, loading: false});
  }

  @Action(AwardsActions.CreateAward)
  createAward(ctx: StateContext<AwardsStateModel>, {payload}: AwardsActions.CreateAward) {
    ctx.setState(
      patch<AwardsStateModel>({awards: append([payload])})
    );
  }

  @Action(AwardsActions.UpdateAward)
  updateAward({dispatch}: StateContext<AwardsStateModel>, {payload}: AwardsActions.UpdateAward): Observable<any> {
    return this.awardsService.updateAward(payload.id, payload)
      .pipe(
        map( award => dispatch(new AwardsActions.UpdateAwardSuccess(award))),
        catchError( error => dispatch(new AwardsActions.UpdateAwardFail(error)))
      );
  }

  @Action(AwardsActions.UpdateAwardSuccess)
  updateAwardSuccess(ctx: StateContext<AwardsStateModel>, {payload}: AwardsActions.UpdateAward): Observable<any> {
    ctx.setState(
      patch<AwardsStateModel>({
        awards: updateItem<IAward>(award => award.id === payload.id, patch<IAward>(payload))
      })
    );
    return of(payload);
  }

  @Action(AwardsActions.UpdateAwardFail)
  updateAwardFail(ctx: StateContext<AwardsStateModel>, {payload}: AwardsActions.UpdateAward): Observable<any> {
    return throwError(payload);
  }

  @Action(AwardsActions.DeleteAward)
  deleteAward({setState}: StateContext<AwardsStateModel>, {payload}: AwardsActions.DeleteAward) {
    setState(
      patch<AwardsStateModel>({
        awards: removeItem(award => award.id === payload )
      })
    );
  }

  @Action(AwardsActions.SelectAward)
  selectAward({patchState}: StateContext<AwardsStateModel>, {payload}: AwardsActions.SelectAward) {
    patchState({selectedAwardId: payload});
  }
}

