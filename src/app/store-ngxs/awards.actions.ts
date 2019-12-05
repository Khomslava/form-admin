import { IAwards } from './../core/models/awards.model';

export enum EAwardsActions {
  GetAwards = '[Awards] Get Awards',
  GetAwardsSuccess = '[Awards] Get Awards Success',
  CreateAward = '[Awards] Create Award',
  CreateAwardSuccess = '[Awards] Create Award Success',
  UpdateAward = '[Awards] Update Award',
  UpdateAwardSuccess = '[Awards] Update Award Success',
  DeleteAward = '[Awards] Delete Award',
  DeleteAwardSuccess = '[Awards] Delete Award Success'
}

export class GetAwards {
  public static readonly type = EAwardsActions.GetAwards;
}

export class UpdateAward {
  public static readonly type = EAwardsActions.UpdateAward;
  constructor(public payload: IAwards) {}
}

export class CreateAward {
  public static readonly type = EAwardsActions.CreateAward;
  constructor(public payload: IAwards) {}
}

export class DeleteAward {
  public static readonly type = EAwardsActions.DeleteAward;
  constructor(public payload: string) {}
}

