import { User } from "../models/User";
import { ResponseStatus } from "../enums/ResponseStatus";
import { BaseRepo } from "./base.repo";
import { IResponse } from "../utils/interfaces";
import { IUserApi, IUsersRequestParams } from "../api/user.api";


export interface IUserRepo {
    getUsers(params?: IUsersRequestParams): Promise<IResponse<User[]>>,

    getUserById(id: number): Promise<IResponse<User>>,

    updateUser(user: User): Promise<IResponse<User>>,

    deleteUser(id: number): Promise<IResponse<void>>,
}


export class UserRepo extends BaseRepo implements IUserRepo {
    private _userApi: IUserApi;

    constructor(userApi: IUserApi) {
        super();
        this._userApi = userApi;
    }

    async getUsers(params?: IUsersRequestParams): Promise<IResponse<User[]>> {
        try {
            const response = await this._userApi.getUsers(params);
            return {
                status: ResponseStatus.SUCCESS,
                data  : response.data,
            };
        } catch (error) {
            return this.sendError(error);
        }
    }

    async deleteUser(id: number): Promise<IResponse<void>> {
        try {
            const response = await this._userApi.deleteUser(id);
            return {
                status: ResponseStatus.SUCCESS,
                data  : response.data,
            };
        } catch (error) {
            return this.sendError(error);
        }
    }

    async getUserById(id: number): Promise<IResponse<User>> {
        try {
            const response = await this._userApi.getUserById(id);
            return {
                status: ResponseStatus.SUCCESS,
                data  : response.data,
            };
        } catch (error) {
            return this.sendError(error);
        }

    }

    async updateUser(user: User): Promise<IResponse<User>> {
        try {
            const response = await this._userApi.updateUser(user);
            return {
                status: ResponseStatus.SUCCESS,
                data  : response.data,
            };
        } catch (error) {
            return this.sendError(error);
        }
    }
}