import InviteUsr from '../_PageSections/InviteUsers';
import UsersList from '../_PageSections/UserList';
import { GetRolesByOrgId } from '@/lib/API/Database/roles/queries';
import { RolesE } from '@/lib/types/enums';

export default async function Invite({ params }) {
  const rolesRes = await GetRolesByOrgId(params.orgId);
  const roles = rolesRes.filter((role) => role.role.toUpperCase() !== RolesE.OWNER);

  return (
    <div>
      <InviteUsr />
      <UsersList roles={roles} />
    </div>
  );
}
