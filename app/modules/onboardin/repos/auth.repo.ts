import { BaseRepo } from "./base.repo";
import { User } from "../models/User";
import { ResponseStatus } from "../enums/ResponseStatus";
import { IResponse } from "../utils/interfaces";
import { IAuthApi } from "../api/auth.api";

export interface IAuthRepo {
    login(user: User): Promise<IResponse<User>>,

    register(user: User): Promise<IResponse<User>>,

    checkLoginAlreadyExists(login: string): Promise<IResponse<boolean>>,
}

export class AuthRepo extends BaseRepo implements IAuthRepo {
    private _authApi: IAuthApi;

    constructor(authApi: IAuthApi) {
        super();
        this._authApi = authApi;
    }

    async checkLoginAlreadyExists(login: string): Promise<IResponse<boolean>> {
        try {
            const response = await this._authApi.checkLoginAlreadyExists(login);
            return {
                status: ResponseStatus.SUCCESS,
                data  : response.data,
            }
        } catch (error) {
            return this.sendError(error);
        }
    }

    async login(user: User): Promise<IResponse<User>> {
        try {
            const response = await this._authApi.login(user);
            return {
                status: ResponseStatus.SUCCESS,
                data  : response.data,
            }
        } catch (error) {
            return this.sendError(error);
        }
    }

    async register(user: User): Promise<IResponse<User>> {
        try {
            const response = await this._authApi.register(user);
            return {
                status: ResponseStatus.SUCCESS,
                data  : response.data,
            }
        } catch (error) {
            return this.sendError(error);
        }
    }

}