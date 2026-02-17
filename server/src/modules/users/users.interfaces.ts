export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export type IUser = {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type ISavedUser = IUser & { id: number };

export type IUserOutput = Omit<ISavedUser, 'password'>;
