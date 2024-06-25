// import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "@/components/LoadingButton.tsx";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import UserProfileForm, {UserFormData} from "@/forms/user-profile-form/UserProfileForm.tsx";
import { useGetMyUser } from "@/api/MyUserApi.tsx";
import { useEffect, useState } from "react";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
};

const CheckoutButton = ({ onCheckout, disabled }: Props) => {
  // const {
  //   isAuthenticated,
  //   isLoading: isAuthLoading,
  //   loginWithRedirect,
  // } = useAuth0();
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  useEffect(() => {
  const token = localStorage.getItem('everybodyeats_token');
    if(token){
      setIsAuthenticated(true);
    }
  }, [pathname])

  if (!isAuthenticated) {
    return (
      <Button onClick={() => navigate('/login')} className="bg-orange-500 flex-1">
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
        <Button disabled={disabled} className="bg-orange-500 flex-1">Go to Checkout</Button>
      </DialogTrigger>
      <DialogContent className="max-2-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          buttonText="Continue to Payment"
        />
      </DialogContent>
    </Dialog>
  );
};
export default CheckoutButton;
