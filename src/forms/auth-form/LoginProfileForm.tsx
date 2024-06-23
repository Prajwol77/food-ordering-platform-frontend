import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(6, "Minimun of six character is required"),
});

export type LoginUserFormData = z.infer<typeof formSchema>;

const LoginProfileForm = ({
  title,
  onSave,
  loading
}: {
  title: string;
  onSave: (loginData: LoginUserFormData) => void;
  loading?: boolean
}) => {
  const form = useForm<LoginUserFormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <>
      <Form {...form}>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-6 md:p-8 lg:p-10 w-full max-w-sm">
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-center">{title}</h2>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white border-gray-300 rounded-md"
                        placeholder="Enter email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white border-gray-300 rounded-md"
                        placeholder="Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 w-full py-2 rounded-md text-white"
                disabled={loading}
              >
                Login
              </Button>
            </form>
            <div className="gap-2 flex items-center justify-center mt-4 text-sm text-gray-700">
              <span>Don't have an account?</span>
              <button
                onClick={() => (window.location.href = "/register")}
                className="text-orange-500 hover:text-orange-600 font-medium"
                disabled={loading}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default LoginProfileForm;
