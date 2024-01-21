import { Permissions } from "src/permission/permissions.enum";
import { UserResponse } from "../response/user.response";


export type UserInRequestType = UserResponse & {
	permissions: Permissions[];
};