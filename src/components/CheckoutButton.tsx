import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "@/components/LoadingButton.tsx";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm.tsx";
import { useGetMyUser } from "@/api/MyUserApi.tsx";
import { useEffect, useState } from "react";
import isTokenValid from "@/lib/checkToken";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  restaurantName: string;
};

const CheckoutButton = ({ onCheckout, disabled, restaurantName }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  useEffect(() => {
    const token = isTokenValid();
    if (token) {
      setIsAuthenticated(true);
    }
  }, [pathname]);

  if (!isAuthenticated) {
    return (
      <Button
        onClick={() => navigate("/login")}
        className="bg-orange-500 flex-1"
      >
        Log in to checkout
      </Button>
    );
  }

  if (!currentUser) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-2-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          restaurantName={restaurantName}
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          buttonText="Pay with Card"
        />
      </DialogContent>
    </Dialog>
  );
};
export default CheckoutButton;
