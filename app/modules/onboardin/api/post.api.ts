import { AxiosPromise } from "axios";
import { Post } from "../models/Post";

export interface IFeedRequestParams {
    sort?: string,
    limit?: number,
    page?: number,
}

export interface IPostApi {
    getFeed(params?: IFeedRequestParams): AxiosPromise<Post[]>,

    getPostById(id: number): AxiosPromise<Post>,

    createPost(post: Post): AxiosPromise<Post>,

    updatePost(post: Post): AxiosPromise<Post>,

    deletePost(id: number): AxiosPromise<null>,
}
