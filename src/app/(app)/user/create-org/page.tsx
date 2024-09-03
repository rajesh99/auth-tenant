'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { OrgFormSchema, OrgFormValues } from '@/lib/types/validations';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icons } from '@/components/Icons';
import { toast } from 'react-toastify';
import config from '@/lib/config/api';
import { useRouter } from 'next/navigation';
import { CreateOrg } from '@/lib/API/Database/org/mutations';
import { CreateRole } from '@/lib/API/Database/roles/mutations';
import { RolesE } from '@/lib/types/enums';

export default function CreateOrgPage() {
  const router = useRouter();
  const form = useForm<OrgFormValues>({
    resolver: zodResolver(OrgFormSchema),
    defaultValues: {
      name: ''
    }
  });

  const {
    register,
    reset,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (values: OrgFormValues) => {
    const name = values.name;
    const props = { name };

    try {
      const org = await CreateOrg(props);
      await CreateRole({ org_id: org?.id, role: RolesE.OWNER, org_name: org?.name });

      reset({ name: '' });
      toast.success('Org Created');
      router.refresh();
    } catch (err) {
      toast.error(config.errorMessageGeneral);
      throw err;
    }
  };

  return (
    <div>
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create a Org</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage /> <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...register('name')}
                        type="text"
                        className="bg-background-light dark:bg-background-dark"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} className="w-full">
                {isSubmitting && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
