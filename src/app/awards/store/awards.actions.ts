import { IAward } from '../models/awards.model';

export enum EAwardsActions {
  LoadAwards = '[Awards API] Load Awards',
  LoadAwardsSuccess = '[Awards] Load Awards Success',
  LoadAwardsFail = '[Awards] Load Awards Fail',
  CreateAward = '[Awards API] Create Award',
  CreateAwardSuccess = '[Awards] Create Award Success',
  CreateAwardFail = '[Awards] Create Award fail',
  UpdateAward = '[Awards API] Update Award',
  UpdateAwardSuccess = '[Awards] Update Award Success',
  UpdateAwardFail = '[Awards] Update Award fail',
  DeleteAward = '[Awards API] Delete Award',
  DeleteAwardSuccess = '[Awards] Delete Award Success',
  DeleteAwardFail = '[Awards] Delete Award Fail',
  SelectAward = '[Awards] Select award'
}

export class LoadAwards {
  public static readonly type = EAwardsActions.LoadAwards;
}

export class LoadAwardsSuccess {
  public static readonly type = EAwardsActions.LoadAwardsSuccess;
  constructor(public payload: IAward[]) {}
}

export class LoadAwardsFail {
  public static readonly type = EAwardsActions.LoadAwardsFail;
}

export class UpdateAward {
  public static readonly type = EAwardsActions.UpdateAward;
  constructor(public payload: IAward) {}
}

export class UpdateAwardSuccess {
  public static readonly type = EAwardsActions.UpdateAwardSuccess;
  constructor(public payload: IAward) {}
}

export class UpdateAwardFail {
  public static readonly type = EAwardsActions.UpdateAwardFail;
  constructor(public payload: any) {}
}

export class CreateAward {
  public static readonly type = EAwardsActions.CreateAward;
  constructor(public payload: IAward) {}
}

export class DeleteAward {
  public static readonly type = EAwardsActions.DeleteAward;
  constructor(public payload: string) {}
}

export class SelectAward {
  public static readonly type = EAwardsActions.SelectAward;
  constructor(public payload: string) {}
}

export type AwardsActions =
  | LoadAwards
  | LoadAwardsSuccess
  | LoadAwardsFail
  | UpdateAward
  | UpdateAwardSuccess
  | UpdateAwardFail
  | CreateAward
  | DeleteAward
  | SelectAward
  ;
