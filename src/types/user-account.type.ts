import type { AccountTrial } from './account-trial.type';

export interface UserAccount {
  uuid: string;
  last_trial_id?: number;
  lastTrial?: AccountTrial;
}