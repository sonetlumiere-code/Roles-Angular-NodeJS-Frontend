export interface InitUser {
  username: string;
  email: string;
  password: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  username: string;
  roles: Role[]
}

export enum Role {
  Admin = '63bb72f46994477f6a85c054',
  Moderator = '63bb72f46994477f6a85c055',
  Gold = '63bb72f46994477f6a85c056',
  Silver = '63bb72f46994477f6a85c057',
  Bronze = '63bb72f46994477f6a85c058',
  Free = '63bb72f46994477f6a85c059'
}

export interface LoginResponse {
  token: string;
}

export interface UserProfileResponse {
  status: boolean;
  user: UserProfile;
}
