import { Permissions } from "./permissions.enum";

export const RolePermissions = {
    director: [Permissions.CREATE_SUBJECT, Permissions.READ_SUBJECT, Permissions.UPDATE_SUBJECT, Permissions.DELETE_SUBJECT],
    teacher: [Permissions.READ_SUBJECT, Permissions.READ_GRADES],
    student: [Permissions.READ_SCHEDULE, Permissions.READ_GRADES],
  };
  