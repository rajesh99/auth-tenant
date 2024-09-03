'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { RolesE } from '@/lib/types/enums';
import { PrismaDBError } from '@/lib/utils/error';
import { GetRoleByUserIdAndOrgId } from './queries';
import { CheckPermission } from './helpers';
import { PermissionsI } from './helpers';
import { Actions, Subjects } from '@/lib/types/enums';
interface CreateRoleI {
  org_id: string;
  role: RolesE;
  org_name: string;
}

export const CreateRole = async ({ org_id, role, org_name }: CreateRoleI) => {
  const user = await GetUser();
  const user_id = user?.id;
  const email = user?.email;

  const isRoleExists = await GetRoleByUserIdAndOrgId({ org_id, user_id });
  if (isRoleExists) throw 'Role Already Exists';

  const data: Prisma.RoleCreateInput = {
    user: { connect: { id: user_id, email } },
    organization: { connect: { id: org_id, name: org_name } },
    role
  };

  try {
    await prisma.role.create({ data });
  } catch (err) {
    PrismaDBError(err);
  }
};

export interface DeleteRoleI extends PermissionsI {
  id: string;
}

export const DeleteRoleByUserIdAndOrgId = async ({ id, role }: DeleteRoleI) => {
  await CheckPermission({ role, action: Actions.DELETE, subject: Subjects.USER });

  try {
    const role = await prisma.role.findFirst({
      where: {
        id
      }
    });

    if (role?.role === RolesE.OWNER) throw 'Can not Remove Owner';

    await prisma.role.delete({
      where: {
        id
      }
    });
  } catch (err) {
    PrismaDBError(err);
  }
};
