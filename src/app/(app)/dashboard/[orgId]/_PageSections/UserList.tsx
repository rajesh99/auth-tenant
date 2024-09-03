'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table';
import { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { DeleteRoleByUserIdAndOrgId } from '@/lib/API/Database/roles/mutations';
import { toast } from 'react-toastify';
import { useAbility } from '@casl/react';
import { AbilityContext } from '@/lib/utils/caslContext';
import { RoleContext } from '@/lib/utils/roleContext';
import { Actions, Subjects } from '@/lib/types/enums';

interface InviteUsersI {
  roles: Role[];
}

export default function UsersList({ roles }: InviteUsersI) {
  const ability = useAbility(AbilityContext);
  const role = useContext(RoleContext);
  const router = useRouter();

  const handleDelete = async ({ id }: { id: string }) => {
    try {
      await DeleteRoleByUserIdAndOrgId({ id, role });
      router.refresh();
    } catch (e) {
      toast.error('Remove User Role Failed');
    }
  };

  return (
    <div className="">
      <Card className="bg-background-light dark:bg-background-dark mt-8">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Org Users</CardTitle>
          <CardDescription>A list of users that are part of this Organization</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">User ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role?.user_id}</TableCell>
                  <TableCell>{role?.email}</TableCell>
                  <TableCell>{role?.role}</TableCell>
                  <TableCell>
                    {ability.can(Actions.DELETE, Subjects.USER) && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete({ id: role?.id })}
                      >
                        Remove
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
