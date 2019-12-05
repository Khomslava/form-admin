import { AwardsStateModel } from './awards.state';
import { IAward } from './../core/models/awards.model';
import { State, Action, Selector, StateContext, StateOperator } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';

import {
  GetAwards,
  UpdateAward,
  CreateAward,
  DeleteAward
} from './awards.actions';

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
  static getAwards(state: AwardsStateModel) {
    return state.awards;
  }

  @Action(GetAwards)
  getAwards({patchState, dispatch}: StateContext<AwardsStateModel>) {
    patchState({loading: true});
    return this.awardsService
  }


  @Action(CreateAward)
  createAward(ctx: StateContext<AwardsStateModel>, {payload}: CreateAward) {
    ctx.setState(
      patch<AwardsStateModel>({awards: append([payload])})
    );
  }

  @Action(UpdateAward)
  updateAward(ctx: StateContext<AwardsStateModel>, {payload}: UpdateAward) {
    ctx.setState(
      patch<AwardsStateModel>({
        awards: updateItem<IAward>(award => award.id === payload.id, patch<IAward>(payload))
      })
    );
  }

  @Action(DeleteAward)
  deleteAward({setState}: StateContext<AwardsStateModel>, {payload}: DeleteAward) {
    setState(
      patch<AwardsStateModel>({
        awards: removeItem(award => award.id === payload )
      })
    )
  }
}




;
