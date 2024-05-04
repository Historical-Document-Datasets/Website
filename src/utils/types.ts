import ItemsJS from "itemsjs";

export interface Dataset {
  id: string;
  name: string;
  statistics: string;
  class: string;
  task: string[];
  language: string[];
  document_type: string;
  mode: string[];
  resolution: string;
  format: string[];
  reference: string;
  description: string;
}

export interface Bucket {
  doc_count: number;
  key: string;
  selected: boolean;
}

export interface Aggregation {
  buckets: Bucket[];
  name: string;
  position: number;
  title: string;
}

export type SearchResult = {
  timings?: { total: number };
  data?: {
    items: Dataset[];
    allFilteredItems: Dataset[] | null;
    aggregations: Aggregation[];
  };
  pagination?: ItemsJS.Pagination;
};

export interface SearchState {
  results: SearchResult;
  filters: Record<string, string[]>;
  conjunction: Record<string, boolean>;
  page: number;
}

export enum SearchActionTypes {
  SET_RESULTS = "SET_RESULTS",
  SET_FILTERS = "SET_FILTERS",
  SET_CONJUNCTION = "SET_CONJUNCTION",
  SET_PAGE = "SET_PAGE",
}

export type SearchAction =
  | { type: "SET_RESULTS"; payload: SearchResult }
  | { type: "SET_FILTERS"; payload: Record<string, string[]> }
  | { type: "SET_CONJUNCTION"; payload: Record<string, boolean> }
  | { type: "SET_PAGE"; payload: number };
