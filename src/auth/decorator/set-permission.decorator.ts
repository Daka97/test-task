import { SetMetadata } from "@nestjs/common";
import { Permissions } from "src/permission/permissions.enum";


export const SetRoutePermissions = (permissions: Permissions[]) => SetMetadata("permissions", permissions);
