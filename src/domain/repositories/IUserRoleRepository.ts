export interface IUserRoleRepository {
  assignRole(userId: number, roleId: number): Promise<void>;
}
