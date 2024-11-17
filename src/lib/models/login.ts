import type { BaseModel, ResponseBaseModel } from "./basemodel";

export interface LoginRequestModel extends BaseModel {
    username: string;
    password: string;
    guest: boolean;
}

export interface UserCreateModel extends BaseModel {
    username: string;
    password: string;
}

// Interface für Login-Antwort
export interface LoginResponseModel extends ResponseBaseModel {
    details: string;
    username?: string;
}