export interface IAuthedUser {
    id: string;
    email: string;
    user_type: string;
    iat: number,
    exp: number;
  }