import IUser from './user';

export default interface IBlog {
    _id: string;
    title: string;
    content: string;
    author: IUser;
    imageUrl?: string;
    tags: Array<string>;
    viewsCount: number;
    createdAt: string;
    updatedAt: string;
}