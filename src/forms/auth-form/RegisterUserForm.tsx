import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { RegisterUserType } from "@/api/AuthApi";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(6, "Minimun of six character is required"),
});

export type LoginUserFormData = z.infer<typeof formSchema>;

const RegisterUserForm = ({
  onSave,
}: {
  onSave: (registerData: RegisterUserType) => void;
}) => {
  const form = useForm<LoginUserFormData>({
    resolver: zodResolver(formSchema),
  });
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSave)}
          className="space-y-4 bg-gray-50 rounded-lg md:p-10"
        >
          <div>
            <h2 className="text-2xl font-bold">{"Register"}</h2>
            <FormDescription>
              View and change your profile information here.
            </FormDescription>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white"
                    placeholder="Enter name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-orange-500">
            Register
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterUserForm;
