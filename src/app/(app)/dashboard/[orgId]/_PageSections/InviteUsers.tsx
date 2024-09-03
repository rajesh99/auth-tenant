'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { OrgInviteFormSchema, OrgInviteFormValues } from '@/lib/types/validations';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select';

import { RolesE } from '@/lib/types/enums';
import { Icons } from '@/components/Icons';
import { Login } from '@/lib/API/Services/auth/login';

import routes from '@/lib/config/routes';
import { usePathname } from 'next/navigation';
import { CreateInvite } from '@/lib/API/Database/invite/mutations';
import { toast } from 'react-toastify';

export default function InviteUsers() {
  const pathname = usePathname();
  const roles = [RolesE.ADMIN, RolesE.MEMBER];

  const form = useForm<OrgInviteFormValues>({
    resolver: zodResolver(OrgInviteFormSchema),
    defaultValues: {
      email: '',
      role: 'member'
    }
  });

  const {
    register,
    reset,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (values: OrgInviteFormValues) => {
    const email = values.email;
    const role = values.role;
    const org_id = pathname.split('/')[2];

    const propsInvite = { email, role, org_id };
    const invite = await CreateInvite(propsInvite);

    const callbackUrl = `${routes.redirects.user.toOrgInvite}/${invite.id}`;
    const propsLogin = { email, callbackUrl };
    await Login(propsLogin);

    reset({ email: '' });
    toast.success('Invite Sent!');
  };

  return (
    <div className="md:w-96">
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Invite Org User</CardTitle>
          <CardDescription>Enter an email below to add user to organization</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...register('email')}
                        type="text"
                        placeholder="Email"
                        className="bg-background-light dark:bg-background-dark"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={RolesE.MEMBER}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div>
                <Button disabled={isSubmitting} className="w-full">
                  {isSubmitting && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
                  <Icons.Mail className="mr-2 h-4 w-4" />
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
