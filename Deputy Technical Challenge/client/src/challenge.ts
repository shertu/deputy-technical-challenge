export interface Role {
  id: number,
  name: string,
  parent: number,
}

export interface User {
  id: number,
  name: string,
  role: number,
}

// a user has one role and a role has many users

/**
 * Finds the users in the specified role.
 * @param {User[]} userArr
 * @param {Role} role
 * @return {User[]}
 */
function filterUsersByRole(userArr: User[], role: Role): User[] {
  return userArr.filter((value: User) => value.role === role.id);
}

/**
 * Finds the role for the specified user.
 * @param {Role[]} roleArr
 * @param {User} user
 * @return {Role}
 */
function findRoleByUser(roleArr: Role[], user: User): Role {
  return roleArr.find((value: Role) => value.id === user.role);
}

/**
 * Gets a list of users who are subordinate by role to the specified user.
 * @param {Role[]} roleArr
 * @param {User[]} userArr
 * @param {number} userId
 * @return {User[]}
 */
export function getSubordinates(roleArr: Role[], userArr: User[], userId: number): User[] {
  const user: User = userArr.find((value: User) => value.id === userId); // find the user
  const role: Role = findRoleByUser(roleArr, user); // find the user's role

  // find child roles recursively
  const childRolesRecursive: Role[] = getChildRolesRecursive(roleArr, role);

  // for each child role, add the users in that role to the subordinate list
  let subordinates: User[] = [];
  childRolesRecursive.forEach((value: Role) => {
    const usersInChildRole: User[] = filterUsersByRole(userArr, value);
    subordinates = subordinates.concat(usersInChildRole);
  });

  return subordinates;
}

/**
 * Gets a list of roles which are subordinate to the specified role recursively.
 * @param {Role[]} roleArr
 * @param {Role} role
 * @return {Role[]}
 */
function getChildRolesRecursive(roleArr: Role[], role: Role): Role[] {
  // find child roles
  const childRoles: Role[] = roleArr.filter((value: Role) => value.parent === role.id);

  // for each child, find their children and add them to the list.
  let childRolesRecursive = [...childRoles];
  childRoles.forEach((value: Role) => {
    childRolesRecursive = childRolesRecursive.concat(getChildRolesRecursive(roleArr, value));
  });

  return childRolesRecursive;
}
