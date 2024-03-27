import { useQuery } from "react-query";
import { baseUrl } from "./UserApi";
import { RestaurantSearchResponse } from "@/types";
import { SearchState } from "@/pages/Search";

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const searchRestu = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);
    const strParams = params.toString();

    const resp = await fetch(
      `${baseUrl}/api/restu/search/${city}?${strParams}`
    );
    if (!resp.ok) {
      throw new Error("Failed to get result");
    }
    return resp.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    searchRestu,
    { enabled: !!city }
  );

  return { results, isLoading };
};
