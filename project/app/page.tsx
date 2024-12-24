"use client";

import { useState } from "react";
import JobCard from "./components/JobCard";
import JobFilters from "./components/JobFilters";
import JobSearch from "./components/JobSearch";
import { Job } from "./types/job";
import { Briefcase } from "lucide-react";

// Temporary mock data until backend is connected
const mockJobs: Job[] = [
  {
    id: "1",
    jobId: "1",
    title: "Senior Frontend Developer",
    summary: "We are looking for an experienced Frontend Developer to join our team...",
    companyName: "Tech Corp",
    companyLogoUrl: "https://via.placeholder.com/150",
    location: "New York, NY",
    salary: "$120k - $150k",
    employmentType: "FULLTIME",
    postedDate: "2023-12-15",
    isRemote: true,
    detailsPageUrl: "#"
  },
  // Add more mock jobs as needed
];

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    // TODO: Implement actual API call
    console.log("Searching for:", query);
    setLoading(false);
  };

  const handleFilterChange = async (filters: any) => {
    setLoading(true);
    // TODO: Implement actual API call with filters
    console.log("Filters changed:", filters);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-2 mb-8">
          <Briefcase className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Job Board</h1>
        </div>

        <div className="mb-8">
          <JobSearch onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <JobFilters onFilterChange={handleFilterChange} />
          </aside>

          <div className="md:col-span-3">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No jobs found. Try adjusting your search or filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}