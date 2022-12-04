export enum EVerificationType {
  password = 'password',
  code = 'code',
  google = 'google',
  facebook = 'facebook'
}

export interface IJwtPayload {
  email: string;
  iat: Date
  exp: Date
}