import IPostUser from './postuser';

export default interface IPost {
    _id: string;
    title: string;
    text: string;
    imageUrl?: string;
    user: IPostUser;
    viewsCount: number;
    tags: Array<string>;  // todo
    // content: string;
    // headline: string;
    // picture?: string;
    createdAt: string;
    // updatedAt: string;
}
