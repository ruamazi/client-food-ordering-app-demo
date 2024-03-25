import { useAuth0 } from "@auth0/auth0-react";
import { baseUrl } from "./UserApi";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { RestaurantType } from "@/types";

export const useCreateMyResturant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestuReq = async (
    restuFormData: FormData
  ): Promise<RestaurantType> => {
    const accessToken = await getAccessTokenSilently();
    const resp = await fetch(`${baseUrl}/api/my/restu`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restuFormData,
    });
    if (!resp.ok) {
      throw new Error("Failed to create restaurant");
    }
    return resp.json();
  };

  const {
    mutate: createRestu,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestuReq);

  if (isSuccess) {
    toast.success("Restaurant created");
  }
  if (error) {
    toast.success("Unable to create restaurant");
  }

  return { createRestu, isLoading };
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestu = async (): Promise<RestaurantType> => {
    const accessToken = await getAccessTokenSilently();
    const resp = await fetch(`${baseUrl}/api/my/restu`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!resp.ok) {
      throw new Error("Failed to get restaurant");
    }
    return resp.json();
  };
  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestu
  );

  return { restaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestu = async (formData: FormData): Promise<RestaurantType> => {
    const accessToken = await getAccessTokenSilently();
    const resp = await fetch(`${baseUrl}/api/my/restu`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    if (!resp.ok) {
      throw new Error("Failed to update restaurant");
    }
    return resp.json();
  };

  const {
    mutate: updateRestu,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateMyRestu);

  if (isSuccess) {
    toast.success("Restaurant updated");
  }
  if (error) {
    toast.success("Unable to update restaurant");
  }

  return { updateRestu, isLoading };
};
