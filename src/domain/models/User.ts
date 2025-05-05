export interface User {
  id?: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  role_id?: number;
}