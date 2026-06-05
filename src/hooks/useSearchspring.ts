import { SearchRequestParams, SearchspringResponse } from "@/types/global.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const SITE_ID = "scmq7n";
const BASE_URL = "https://api.searchspring.net/api/search/search.json";
const reservedParams = new Set(["q", "page", "sort"]);

export const useSearchspring = () => {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort") || "";

  // Everything except q/page/sort is treated as a facet filter from the URL.
  const activeFilters: Record<string, string | string[]> = {};

  searchParams.forEach((value, key) => {
    if (!reservedParams.has(key)) {
      const rangeMatch = key.match(/^(.*)\.(low|high)$/);

      if (rangeMatch) {
        const [, field, bound] = rangeMatch;
        activeFilters[`filter.${field}.${bound}`] = value;
        return;
      }

      const filterKey = `filter.${key}`;

      if (activeFilters[filterKey]) {
        if (Array.isArray(activeFilters[filterKey])) {
          activeFilters[filterKey].push(value);
        } else {
          activeFilters[filterKey] = [activeFilters[filterKey], value];
        }
      } else {
        activeFilters[filterKey] = value;
      }
    }
  });

  const fetchProducts = async (): Promise<SearchspringResponse> => {
    const params: SearchRequestParams = {
      siteId: SITE_ID,
      resultsFormat: "native",
      page,
    };

    if (q) params.q = q;

    if (sort) {
      const [field, direction] = sort.split("-");
      if (field && direction) {
        params[`sort.${field}`] = direction;
      }
    }

    Object.entries(activeFilters).forEach(([field, value]) => {
      params[field] = value;
    });

    const { data } = await axios.get<SearchspringResponse>(BASE_URL, {
      params,
      paramsSerializer: {
        // Searchspring expects repeated keys instead of key[] for arrays.
        indexes: null,
      },
    });

    return data;
  };

  return useQuery({
    queryKey: ["products", q, page, sort, activeFilters],
    queryFn: fetchProducts,
    placeholderData: keepPreviousData,
  });
};
