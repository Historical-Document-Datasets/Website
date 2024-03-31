import ItemsJS from "itemsjs";

export interface Dataset {
  id: number;
  name: string;
  languages: string[];
  image_format: string[];
  color_mode: string[];
  document_type: string;
  task: string;
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
