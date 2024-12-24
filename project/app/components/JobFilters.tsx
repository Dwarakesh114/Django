"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface JobFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  return (
    <div className="space-y-4 p-4 bg-card rounded-lg">
      <h2 className="font-semibold">Filters</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Employment Type</Label>
          <Select onValueChange={(value) => onFilterChange({ employmentType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FULLTIME">Full Time</SelectItem>
              <SelectItem value="CONTRACTS">Contract</SelectItem>
              <SelectItem value="PARTTIME">Part Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Posted Date</Label>
          <Select onValueChange={(value) => onFilterChange({ postedDate: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ONE">Last 24 hours</SelectItem>
              <SelectItem value="THREE">Last 3 days</SelectItem>
              <SelectItem value="SEVEN">Last 7 days</SelectItem>
              <SelectItem value="THIRTY">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="remote"
            onCheckedChange={(checked) => onFilterChange({ isRemote: checked })}
          />
          <Label htmlFor="remote">Remote Only</Label>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => onFilterChange({ reset: true })}
      >
        Reset Filters
      </Button>
    </div>
  );
}