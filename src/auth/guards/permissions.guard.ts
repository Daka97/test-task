import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Permissions } from "src/permission/permissions.enum";


@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const routPermissions = this.reflector.get<Permissions[]>("permissions", context.getHandler());
        console.log(routPermissions)

		if (!routPermissions) {
			return true;

		}

		const request = context.switchToHttp().getRequest();
		const userPermissions = request.user.permissions;

		return routPermissions.some(routPermission => userPermissions.includes(routPermission));
	}
}
