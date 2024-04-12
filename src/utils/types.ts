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
    allFilteredItems: Dataset[];
    aggregations: Aggregation[];
  };
  pagination?: ItemsJS.Pagination;
};
