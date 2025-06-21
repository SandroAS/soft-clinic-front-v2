import type { RoleType } from '../user/user-role.type';

export interface Role {
  uuid: string;
  name: RoleType;
  permissions: string[];
}
