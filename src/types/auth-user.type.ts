import type { UserAccount } from './user-account.type';
import type { UserMeta } from './user-meta.type';
import type { UserRole } from './user-role.type';

export interface AuthUser {
  uuid: string;
  account?: UserAccount;
  name: string;
  email: string;
  cellphone?: string;
  cpf?: string;
  gender?: 'MALE' | 'FEMALE' | null;
  google_id?: string | null;
  profile_img_url?: string | null;
  is_active: boolean;
  role_id: number;
  role: UserRole;
  userMetas: UserMeta[]
  created_at: string;
  updated_at: string;
}
