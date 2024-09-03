'use server';

import { GetUser } from '@/lib/API/Database/user/queries';
import { ForbiddenError } from '@casl/ability';
import { defineAbilityFor } from '@/lib/utils/caslAbility';
import { Actions, RolesE, Subjects } from '@/lib/types/enums';

interface TestRolePropsI extends PermissionsI {
  test: string;
}

export interface PermissionsI {
  role: RolesE;
}

export const TestRole = async ({ test, role }: TestRolePropsI) => {
  await CheckPermission({ role, action: Actions.READ, subject: Subjects.TODO });
  return `${test} successful`;
};

export const CheckPermission = async ({ role, action, subject }) => {
  ForbiddenError.setDefaultMessage(
    (error) => `You are not allowed to ${error.action} on ${error.subjectType}`
  );

  const user = await GetUser();
  const user_id = user?.id;

  ForbiddenError.from(defineAbilityFor(role, user_id)).throwUnlessCan(action, subject);
};
