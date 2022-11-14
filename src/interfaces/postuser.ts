/* eslint-disable prettier/prettier */
export default interface IPostUser {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  avatarUrl: string;
}