'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { PrismaDBError } from '@/lib/utils/error';
import { OrgInviteFormValues } from '@/lib/types/validations';

import { Invite } from '@prisma/client';

interface CreateInvitePropsI extends OrgInviteFormValues {
  org_id: string;
}

export const CreateInvite = async ({
  email,
  role,
  org_id
}: CreateInvitePropsI): Promise<Invite> => {
  const data: Prisma.InviteCreateInput = {
    role,
    email,
    organization: { connect: { id: org_id } }
  };

  try {
    const invite: Invite = await prisma.invite.create({ data });
    return invite;
  } catch (err) {
    PrismaDBError(err);
  }
};

interface InvitePropsI {
  invite_id: string;
}

// The query does not need to be cached, so can be defined here as a server action for simplicity
export const GetInviteId = async ({ invite_id }: InvitePropsI): Promise<Invite> => {
  try {
    const invite = await prisma.invite.findFirst({
      where: { id: invite_id }
    });

    return invite;
  } catch (err) {
    PrismaDBError(err);
  }
};

export const DeleteInvite = async ({ invite_id }: InvitePropsI) => {
  try {
    await prisma.invite.delete({
      where: {
        id: invite_id
      }
    });
  } catch (err) {
    PrismaDBError(err);
  }
};
