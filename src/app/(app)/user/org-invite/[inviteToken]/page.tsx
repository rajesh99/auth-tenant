import { DeleteInvite, GetInviteId } from '@/lib/API/Database/invite/mutations';
import { GetUser } from '@/lib/API/Database/user/queries';
import { CreateRole } from '@/lib/API/Database/roles/mutations';
import { RolesE } from '@/lib/types/enums';
import { GetOrg } from '@/lib/API/Database/org/queries';

export default async function UserDashboard({ params }) {
  const invite = await GetInviteId(params.inviteToken);
  const user = await GetUser();
  const isMatchEmail = invite?.email === user?.email;

  if (!invite || !isMatchEmail) throw 'Unauthorized Access';

  const { role, org_id, id } = invite;
  const org = await GetOrg({ id: org_id });

  await CreateRole({
    org_id,
    role: RolesE[role.toUpperCase()],
    org_name: org?.name
  });

  await DeleteInvite({ invite_id: id });

  return <div>Setting Up Organization Finished</div>;
}
