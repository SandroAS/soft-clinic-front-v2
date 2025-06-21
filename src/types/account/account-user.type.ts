import type { Role } from '../role/role.type';

export default interface AccountUser {
  uuid?: string;
  name: string;
  email: string;
  cellphone?: string;
  cpf?: string;
  is_active: boolean;
  password?: string | null;
  role: Role
}
