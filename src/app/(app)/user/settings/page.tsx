import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/Card';
import { UpdateDisplayName, UpdateEmail } from '../_PageSections/UpdateForms';
import { GetUser } from '@/lib/API/Database/user/queries';

export default async function ProfileForm() {
  const user = await GetUser();

  const display_name = user?.display_name || '';
  const email = user?.email;

  return (
    <div>
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader>
          <CardTitle>Update Account</CardTitle>
          <CardDescription>Update Account display name, email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateDisplayName display_name={display_name} />
          <UpdateEmail email={email} />
        </CardContent>
      </Card>
    </div>
  );
}
