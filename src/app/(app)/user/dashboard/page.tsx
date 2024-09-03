import MyRoles from '../_PageSections/MyRoles';
import { GetRolesByUserId } from '@/lib/API/Database/roles/queries';

export default async function UserDashboard() {
  const roles = await GetRolesByUserId();

  return (
    <div>
      <MyRoles roles={roles} />
    </div>
  );
}
