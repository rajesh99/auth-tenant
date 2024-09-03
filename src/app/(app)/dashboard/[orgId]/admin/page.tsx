import AdminCard from '../_PageSections/AdminCard';
import { GetUser } from '@/lib/API/Database/user/queries';

export default async function Admin() {
  const user = await GetUser();
  const user_id = user?.id;

  return (
    <div>
      <AdminCard id={user_id} />
    </div>
  );
}
