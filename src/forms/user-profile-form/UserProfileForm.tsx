import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import LoadingButton from "@/components/LoadingButton.tsx";
import { Button } from "@/components/ui/button";
import { User } from "@/types.ts";
import { useEffect } from "react";
import { Maps_v2 } from "@/pages";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "name is required"),
  address: z.string().min(1, "address is required"),
  city: z.string().min(1, "city is required"),
  contact: z
    .string()
    .regex(/^[0-9]+$/, "Contact number must be only digits")
    .min(10, "Enter a ten-digit number")
    .max(10, "Contact number must be 10 digits"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
  restaurantName: string;
};

const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  title = "User Profile",
  buttonText = "Submit",
  restaurantName,
}: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  const openMap = () => {
    debugger
    const url = `/maps/restaurant/${encodeURIComponent(restaurantName)}`;
    window.open(url, '_blank');
  }

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSave)}
          className="space-y-4 bg-gray-50 rounded-lg md:p-10"
        >
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>

            <FormDescription>
              View and change your profile information here.
            </FormDescription>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Contact Number</FormLabel>
                  <div className="flex">
                    <span className="border px-3 flex items-center mr-2">
                      +977
                    </span>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white flex-1 border-l-0"
                        placeholder="Enter contact number"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" className="bg-orange-500">
              {buttonText}
            </Button>
          )}
          {restaurantName && <Button type='button' onClick={openMap}>Open Map</Button>}
        </form>
      </Form>
      
    </>
  );
};

export default UserProfileForm;
