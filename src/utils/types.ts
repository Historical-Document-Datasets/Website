import ItemsJS from "itemsjs";
import { z } from "zod";

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
  query: string;
  sort: "name_asc" | "name_desc" | "none";
  perPage: number;
  results: SearchResult;
  filters: Record<string, string[]>;
  conjunction: Record<string, boolean>;
  page: number;
}

export enum SearchActionTypes {
  SET_QUERY = "SET_QUERY",
  SET_SORT = "SET_SORT",
  SET_PER_PAGE = "SET_PER_PAGE",
  SET_RESULTS = "SET_RESULTS",
  SET_FILTERS = "SET_FILTERS",
  SET_CONJUNCTION = "SET_CONJUNCTION",
  SET_PAGE = "SET_PAGE",
  CLEAR_FILTERS = "CLEAR_FILTERS",
}

export type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_SORT"; payload: "name_asc" | "name_desc" | "none" }
  | { type: "SET_PER_PAGE"; payload: number }
  | { type: "SET_RESULTS"; payload: object }
  | { type: "SET_FILTERS"; payload: Record<string, string[]> }
  | { type: "SET_CONJUNCTION"; payload: Record<string, boolean> }
  | { type: "SET_PAGE"; payload: number }
  | { type: "CLEAR_FILTERS" };

export const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  languages: z.array(z.string()).nonempty("At least one language is required."),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
