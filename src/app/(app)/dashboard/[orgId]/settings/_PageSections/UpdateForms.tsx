'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/Form';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/Icons';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { OrgFormSchema, OrgFormValues } from '@/lib/types/validations';

import { usePathname, useRouter } from 'next/navigation';

import { UpdateOrgName } from '@/lib/API/Database/org/mutations';
interface UpdateOrgNamePropsI {
  name: string;
}

export const UpdateOrgNameForm = ({ name }: UpdateOrgNamePropsI) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<OrgFormValues>({
    resolver: zodResolver(OrgFormSchema),
    defaultValues: {
      name
    }
  });

  const {
    setError,
    register,
    formState: { isSubmitting }
  } = form;

  const handleSubmit = async (data: OrgFormValues) => {
    const name = data.name;
    const org_id = pathname.split('/')[2];

    const props = { name, org_id };

    try {
      await UpdateOrgName(props);
    } catch (err) {
      setError('name', {
        type: '"root.serverError',
        message: 'Something went wrong'
      });
      throw err;
    }

    router.refresh();
    toast.success('Update Completed');
  };

  return (
    <div className="mt-4 mb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormMessage className="py-2" />
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    {...register('name')}
                    className="bg-background-light dark:bg-background-dark"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} className="mt-4">
            {isSubmitting && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};
