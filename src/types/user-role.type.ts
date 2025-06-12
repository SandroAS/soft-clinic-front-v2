export type RoleType = 'SUPER_ADMIN' | 'ADMIN' | 'ASSISTENT' | 'HEALTH_PROFESSIONAL' | 'PATIENT'

export interface UserRole {
  uuid: string;
  name: RoleType;
  permissions: string[];
}