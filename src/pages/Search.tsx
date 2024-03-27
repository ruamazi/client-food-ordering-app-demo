import { useSearchRestaurant } from "@/api/restaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const Search = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurant(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };
  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({ ...prev, selectedCuisines, page: 1 }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption,
      page: 1,
    }));
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!results?.data || !city) {
    return <span>No results found!</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
        insert cuisines here
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant, i) => (
          <SearchResultCard key={i} restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Search;
