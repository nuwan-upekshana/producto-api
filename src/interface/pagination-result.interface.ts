export interface IPaginatedResult {
  results: any[];
  sizePerPage: number;
  page: number;
  totalDocs: number;
  totalPages: number;
}
