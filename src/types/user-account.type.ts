import type { AccountTrial } from './account-trial.type';
import type { SystemModule } from './system-module.type';

export interface UserAccount {
  uuid: string;
  last_trial_id?: number;
  lastTrial?: AccountTrial;
  systemModules: SystemModule[];
}
