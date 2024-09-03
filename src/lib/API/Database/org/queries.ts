import { Organization } from '@prisma/client';
import prisma from '../../Services/init/prisma';
import { PrismaDBError } from '@/lib/utils/error';

export const GetOrg = async ({ id }): Promise<Organization> => {
  try {
    const org = await prisma.organization.findFirst({
      where: {
        id
      }
    });
    return org;
  } catch (err) {
    PrismaDBError(err);
  }
};
