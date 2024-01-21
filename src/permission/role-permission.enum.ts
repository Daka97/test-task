import { Permissions } from "./permissions.enum";

export const RolePermissions = {
    director: [Permissions.CREATE_SUBJECT, Permissions.READ_SUBJECT,
    Permissions.UPDATE_SUBJECT, Permissions.DELETE_SUBJECT,
    Permissions.CREATE_GRADES, Permissions.ACCESS_SYSTEM_REPORTS,
    Permissions.READ_GRADES, Permissions.DELETE_GRADES,
    Permissions.UPDATE_GRADES, Permissions.CREATE_GROUPS,
    Permissions.READ_GROUPS, Permissions.UPDATE_GROUPS,
    Permissions.READ_USERS, Permissions.UPDATE_USERS,
    Permissions.DELETE_USERS
    ],
    teacher: [Permissions.READ_SUBJECT, Permissions.CREATE_GRADES,
    Permissions.READ_GRADES, Permissions.DELETE_GRADES,
    Permissions.UPDATE_GRADES, Permissions.CREATE_GROUPS,
    Permissions.READ_GROUPS, Permissions.UPDATE_GROUPS, Permissions.READ_USERS,],
    student: [Permissions.READ_SUBJECT, Permissions.READ_GRADES],
};
