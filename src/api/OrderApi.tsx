import { useAuth0 } from "@auth0/auth0-react";
import { baseUrl } from "./UserApi";
import { useMutation } from "react-query";
import { toast } from "sonner";

type CheckOutSessionRequestT = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutReq = async (
    checkoutSessionRequest: CheckOutSessionRequestT
  ) => {
    const accessToken = await getAccessTokenSilently();
    const resp = await fetch(
      `${baseUrl}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );
    if (!resp.ok) {
      throw new Error("Unable to create checkout session");
    }
    return resp.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutReq);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { createCheckoutSession, isLoading };
};
