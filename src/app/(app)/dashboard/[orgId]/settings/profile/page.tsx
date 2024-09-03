import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/Card';
import { UpdateOrgNameForm } from '../_PageSections/UpdateForms';
import { GetOrg } from '@/lib/API/Database/org/queries';

export default async function ProfileForm({ params }) {
  const org = await GetOrg({ id: params.orgId });

  const name = org?.name;

  return (
    <div>
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader>
          <CardTitle>Update Org</CardTitle>
          <CardDescription>Update Org display name</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateOrgNameForm name={name} />
        </CardContent>
      </Card>
    </div>
  );
}
