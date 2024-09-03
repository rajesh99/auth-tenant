'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { PrismaDBError } from '@/lib/utils/error';
import { OrgFormValues } from '@/lib/types/validations';

export const CreateOrg = async ({ name }: OrgFormValues) => {
  const user = await GetUser();
  const user_id = user?.id;

  const data: Prisma.OrganizationCreateInput = {
    name,
    user: { connect: { id: user_id } }
  };

  try {
    const org = await prisma.organization.create({ data });
    return org;
  } catch (err) {
    PrismaDBError(err);
  }
};

interface UpdateOrgNamePropsI extends OrgFormValues {
  org_id: string;
}

export const UpdateOrgName = async ({ name, org_id }: UpdateOrgNamePropsI) => {
  const data: Prisma.OrganizationUpdateInput = { name };

  try {
    await prisma.organization.update({
      where: {
        id: org_id
      },
      data
    });
  } catch (err) {
    PrismaDBError(err);
  }
};
