"use client";

import { Job } from "../types/job";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Building2, ExternalLink } from "lucide-react";
import Image from "next/image";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-start space-x-4">
        <div className="relative w-12 h-12">
          {job.companyLogoUrl ? (
            <Image
              src={job.companyLogoUrl}
              alt={`${job.companyName} logo`}
              fill
              className="object-contain rounded-md"
            />
          ) : (
            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
              <Building2 className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.companyName}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{job.summary}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {job.location}
            </Badge>
            {job.isRemote && (
              <Badge variant="outline" className="border-green-500 text-green-600">
                Remote
              </Badge>
            )}
            <Badge variant="outline">{job.employmentType}</Badge>
            {job.salary && (
              <Badge variant="outline" className="border-blue-500 text-blue-600">
                {job.salary}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="w-4 h-4 mr-1" />
          Posted {formatDate(job.postedDate)}
        </div>
        <Button variant="outline" size="sm" asChild>
          <a
            href={job.detailsPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            View Job <ExternalLink className="w-3 h-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}