import { useState } from 'react';
import { Search, Filter, Plus, FileText, Users, UserCheck, Eye, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCompanyStore } from '@/store/useCompanyStore';
import { JobStatus } from '@/types';
import { cn } from '@/lib/utils';

const getStatusBadgeClass = (status: JobStatus) => {
  switch (status) {
    case 'Open':
      return 'status-open';
    case 'On Hold':
      return 'status-on-hold';
    case 'Canceled':
      return 'status-canceled';
    case 'Closed':
      return 'status-closed';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const JobsTab = () => {
  const { currentCompany, filteredJobs, jobFilter, setJobFilter, updateJob } = useCompanyStore();
  const [searchQuery, setSearchQuery] = useState('');

  if (!currentCompany) return null;

  const jobs = filteredJobs();

  const handleStatusChange = (jobId: string, newStatus: JobStatus) => {
    updateJob(jobId, { status: newStatus });
  };

  const handleFilterChange = (statuses: JobStatus[]) => {
    setJobFilter({ statuses });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setJobFilter({ searchQuery: query });
  };

  const getContactName = (contactId?: string) => {
    if (!contactId) return 'Unassigned';
    const contact = currentCompany.contacts.find(c => c.id === contactId);
    return contact?.name || 'Unknown Contact';
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
                <Badge variant="secondary" className="ml-2">
                  {jobFilter.statuses.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <div className="p-2">
                <div className="relative mb-2">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-text-muted" />
                  <Input placeholder="Search statuses..." className="pl-7 h-8 text-xs" />
                </div>
              </div>
              <DropdownMenuSeparator />
              {(['Open', 'On Hold', 'Canceled', 'Closed'] as JobStatus[]).map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={jobFilter.statuses.includes(status)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleFilterChange([...jobFilter.statuses, status]);
                    } else {
                      handleFilterChange(jobFilter.statuses.filter(s => s !== status));
                    }
                  }}
                >
                  <Badge className={cn('mr-2 text-xs', getStatusBadgeClass(status))}>
                    {status}
                  </Badge>
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFilterChange(['Open', 'On Hold', 'Canceled', 'Closed'])}>
                Select All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange([])}>
                Deselect All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            View All Jobs
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                View Assigned Candidates
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              View all candidates assigned to jobs at this company
            </TooltipContent>
          </Tooltip>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Job
          </Button>
        </div>
      </div>

      {/* Jobs List */}
      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-card border border-border rounded-lg p-4 card-hover">
              <div className="flex items-start gap-4">
                {/* Job Avatar */}
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {job.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-text mb-1">{job.title}</h3>
                      {job.city && (
                        <p className="text-sm text-text-muted flex items-center gap-1">
                          <span>📍</span>
                          {job.city}
                        </p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Job</DropdownMenuItem>
                        <DropdownMenuItem>Clone Job</DropdownMenuItem>
                        <DropdownMenuItem>Archive Job</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-danger">Delete Job</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Job Details Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-text-muted font-medium mb-1">CONTACT</div>
                      <div className="text-sm text-text">{getContactName(job.contactId)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted font-medium mb-1">OWNER</div>
                      <div className="text-sm text-text">{currentCompany.owner.name}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted font-medium mb-1">STATUS</div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge 
                            className={cn('cursor-pointer hover:opacity-80', getStatusBadgeClass(job.status))}
                          >
                            {job.status}
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {(['Open', 'On Hold', 'Canceled', 'Closed'] as JobStatus[]).map((status) => (
                            <DropdownMenuItem 
                              key={status}
                              onClick={() => handleStatusChange(job.id, status)}
                            >
                              <Badge className={cn('mr-2 text-xs', getStatusBadgeClass(status))}>
                                {status}
                              </Badge>
                              {status}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center justify-end">
                      {job.hasJD && (
                        <Tooltip>
                          <TooltipTrigger>
                            <FileText className="h-4 w-4 text-primary" />
                          </TooltipTrigger>
                          <TooltipContent>Job description attached</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>

                  {/* Footer Chips */}
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                      <Users className="h-3 w-3" />
                      {job.pipelineCount} Candidates In Pipeline
                    </Button>
                    
                    {job.placedCount > 0 && (
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                        <UserCheck className="h-3 w-3" />
                        {job.placedCount} Placed
                      </Button>
                    )}
                    
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary">
                      <Eye className="h-3 w-3" />
                      View Candidate Pipeline
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Users className="h-8 w-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">No jobs found</h3>
          <p className="text-text-muted mb-6">
            {jobFilter.searchQuery || jobFilter.statuses.length < 4
              ? "Try adjusting your search or filter criteria"
              : "Get started by adding your first job posting"}
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Job
          </Button>
        </div>
      )}
    </div>
  );
};