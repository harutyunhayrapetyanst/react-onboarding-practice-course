import { Post } from "../models/Post";
import { BaseRepo } from "./base.repo";
import { ResponseStatus } from "../enums/ResponseStatus";
import { IResponse } from "../utils/interfaces";
import { IFeedRequestParams, IPostApi } from "../api/post.api";

export interface IPostRepo {
    getFeed(params?: IFeedRequestParams): Promise<IResponse<Post[]>>,

    getPostById(id: number): Promise<IResponse<Post>>,

    createPost(post: Post): Promise<IResponse<Post>>,

    updatePost(post: Post): Promise<IResponse<Post>>,

    deletePost(id: number): Promise<IResponse<null>>,
}


export class PostRepo extends BaseRepo implements IPostRepo {
    private _postApi: IPostApi;

    constructor(postApi: IPostApi) {
        super();
        this._postApi = postApi;
    }

    async createPost(post: Post): Promise<IResponse<Post>> {
        try {
            const response = await this._postApi.createPost(post);
            return {
                status: ResponseStatus.SUCCESS,
                data  : response.data,
            }
        } catch (error) {
            return this.sendError(error);
        }
    }

    async deletePost(id: number): Promise<IResponse<null>> {
        try {
            await this._postApi.deletePost(id);
            return {
                status: ResponseStatus.SUCCESS,
                data  : null,
            }
        } catch (error) {
            return this.sendError(error);
        }
    }

    async getFeed(params?: IFeedRequestParams): Promise<IResponse<Post[]>> {
        try {
            const response = await this._postApi.getFeed(params);
            return {
                status: ResponseStatus.SUCCESS,
                data  : response.data,
            }
        } catch (error) {
            return this.sendError(error);
        }
    }

    async getPostById(id: number): Promise<IResponse<Post>> {
        try {
            const response = await this._postApi.getPostById(id);
            return {
                status: ResponseStatus.SUCCESS,
                data  : response.data,
            }
        } catch (error) {
            return this.sendError(error);
        }
    }

    async updatePost(post: Post): Promise<IResponse<Post>> {
        try {
            const response = await this._postApi.updatePost(post);
            return {
                status: ResponseStatus.SUCCESS,
                data  : response.data,
            }
        } catch (error) {
            return this.sendError(error);
        }
    }
}