// authorization.middleware.ts

import { RolePermissions } from "src/permission/role-permission.enum";

export function AuthorizationMiddleware(permissions: string[]) {
  return (req, res, next) => {
    const userRole = req.user.role; 
    if (userRole && RolePermissions[userRole]) {
      const userPermissions = RolePermissions[userRole];
      
      if (permissions.some(permission => userPermissions.includes(permission))) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
      }
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
