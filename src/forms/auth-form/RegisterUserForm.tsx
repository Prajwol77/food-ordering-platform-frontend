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
import { RegisterUserType } from "@/api/AuthApi";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(6, "Minimun of six character is required"),
});

export type LoginUserFormData = z.infer<typeof formSchema>;

const RegisterUserForm = ({
  onSave,
  loading,
}: {
  onSave: (registerData: RegisterUserType) => void;
  loading?: boolean;
}) => {
  const form = useForm<LoginUserFormData>({
    resolver: zodResolver(formSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Form {...form}>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-6 md:p-8 lg:p-10 w-full max-w-sm">
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-center">Register</h2>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white border-gray-300 rounded-md"
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
                      <div className="relative">
                        <Input
                          {...field}
                          className="bg-white border-gray-300 rounded-md pr-10"
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
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
                Register
              </Button>
            </form>
            <div className="flex items-center justify-center mt-4 text-sm text-gray-700">
              <span>Already have an account?</span>
              <button
                onClick={() => navigate("/login")}
                className="text-orange-500 hover:text-orange-600 font-medium ml-1"
                disabled={loading}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default RegisterUserForm;
