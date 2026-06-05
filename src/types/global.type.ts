export interface Product {
  id: string;
  name: string;
  price: string;
  msrp?: string;
  imageUrl: string;
  thumbnailImageUrl?: string;
  brand?: string;
  description?: string;
  [key: string]: unknown;
}

export interface FacetValue {
  value?: string;
  label: string;
  count: number;
  active: boolean;
  type?: string;
  low?: string;
  high?: string;
}

export interface Facet {
  field: string;
  label: string;
  values: FacetValue[];
  type?: string;
  multiple?: string;
  collapse?: number;
  facet_active?: number;
  hierarchyDelimiter?: string;
  range?: number[];
}

export interface SortOption {
  field: string;
  direction: string;
  label: string;
}

export interface SearchspringResponse {
  results?: Product[];
  pagination?: {
    totalResults: number;
    totalPages: number;
    currentPage: number;
  };
  sorting?: {
    options?: SortOption[];
    current?: {
      field?: string;
      direction?: string;
    };
  };
  facets?: Facet[];
  merchandising?: {
    header?: string;
  };
}

export type SearchRequestParams = Record<
  string,
  string | number | boolean | string[] | undefined
>;
