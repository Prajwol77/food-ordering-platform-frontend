import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "@/api/RestaurantApi.tsx";
import SearchResultInfo from "@/components/SearchResultInfo.tsx";
import SearchResultCard from "@/components/SearchResultCard.tsx";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/SearchBar.tsx";
import PaginationSelector from "@/components/PaginationSelector.tsx";
import CuisineFilter from "@/components/CuisineFilter.tsx";
import SortOptionDropdown from "@/components/SortOptionDropdown.tsx";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    <span>Loading ...</span>;
  }
  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-col-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <div className="mb-4 text-center">
          <span className="text-xl font-bold">You have selected {city}. Now search for restaurants or cuisines in this city.</span>
        </div>
        <SearchBar
            searchQuery={searchState.searchQuery}
            onSubmit={setSearchQuery}
            placeHolder={`Search for restaurants or cuisines in ${city}`}
            onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city}/>
          <SortOptionDropdown
              sortOption={searchState.sortOption}
              onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant, index) => (
            <SearchResultCard restaurant={restaurant} key={index}/>
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
export default SearchPage;
