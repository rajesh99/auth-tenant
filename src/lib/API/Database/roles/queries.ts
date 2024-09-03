import 'server-only';

import prisma from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { PrismaDBError } from '@/lib/utils/error';
import { Role } from '@prisma/client';

export const GetRolesByUserId = async (): Promise<Role[]> => {
  const user = await GetUser();
  const user_id = user?.id;

  try {
    const roles = await prisma.role.findMany({
      where: {
        user_id
      }
    });

    return roles;
  } catch (err) {
    PrismaDBError(err);
  }
};

interface GetRolePropsI {
  org_id: string;
  user_id: string;
}

export const GetRoleByUserIdAndOrgId = async ({
  org_id,
  user_id
}: GetRolePropsI): Promise<Role> => {
  try {
    const roles = await prisma.role.findFirst({
      where: {
        AND: {
          user_id: { equals: user_id },
          org_id: { equals: org_id }
        }
      }
    });

    return roles;
  } catch (err) {
    PrismaDBError(err);
  }
};

export const GetRolesByOrgId = async (org_id: string): Promise<Role[]> => {
  try {
    const roles = await prisma.role.findMany({
      where: {
        org_id
      }
    });

    return roles;
  } catch (err) {
    PrismaDBError(err);
  }
};
