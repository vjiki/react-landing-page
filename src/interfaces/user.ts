/* eslint-disable prettier/prettier */
export default interface IUser {
    _id: string;
    uid: string;
    name: string;
    avatarUrl: string;
}

export const DEFAULT_USER: IUser = {
    _id: '',
    uid: '',
    name: '',
    avatarUrl: ''
};

export const DEFAULT_FIRE_TOKEN = '';
