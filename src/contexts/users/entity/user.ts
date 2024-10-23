export interface User {
  id: number;
  email: string;
  password: string;
  isVerified: boolean;
  oauthProvider: string | null;
  oauthId: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export type UserInput = Pick<User, 'email' | 'password'>;

// Partial is a utility type that makes all properties of the object optional.
// Omit is a utility type that makes it possible to create a new type by omitting properties from another type.
// Pick is a utility type that makes it possible to create a new type by picking properties from another type.
