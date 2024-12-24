export interface Job {
  id: string;
  jobId: string;
  title: string;
  summary: string;
  companyName: string;
  companyLogoUrl: string;
  location: string;
  salary: string;
  employmentType: string;
  postedDate: string;
  isRemote: boolean;
  detailsPageUrl: string;
}

export interface JobsResponse {
  jobs: Job[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}