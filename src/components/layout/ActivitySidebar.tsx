import { useState } from 'react';
import { Search, Filter, Plus, FileText, Phone, CheckSquare, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCompanyStore } from '@/store/useCompanyStore';
import { ActivityType } from '@/types';
import { cn } from '@/lib/utils';

const activityIcons = {
  note: FileText,
  call: Phone,
  task: CheckSquare,
  meeting: Calendar,
  file: FileText,
};

const activityColors = {
  note: 'bg-blue-500',
  call: 'bg-green-500', 
  task: 'bg-orange-500',
  meeting: 'bg-purple-500',
  file: 'bg-gray-500',
};

export const ActivitySidebar = () => {
  const { activities, activityFilter, setActivityFilter, filteredActivities } = useCompanyStore();
  const [quickActionsExpanded, setQuickActionsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (types: ActivityType[]) => {
    setActivityFilter({ types });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setActivityFilter({ searchQuery: query });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const displayedActivities = filteredActivities();

  return (
    <div className="w-80 bg-surface border-l border-border h-[calc(100vh-48px)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text mb-4">Activities</h2>
        
        {/* Quick Actions */}
        <Collapsible open={quickActionsExpanded} onOpenChange={setQuickActionsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="text-sm font-medium">Quick Actions</span>
              {quickActionsExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Add Note
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call Log
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <CheckSquare className="h-4 w-4 mr-2" />
                Task
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Meeting
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-5 w-full mx-4 mt-4">
          <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
          <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
          <TabsTrigger value="tasks" className="text-xs">Tasks</TabsTrigger>
          <TabsTrigger value="meetings" className="text-xs">Meetings</TabsTrigger>
          <TabsTrigger value="files" className="text-xs">Files</TabsTrigger>
        </TabsList>

        {/* Search and Filter */}
        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </span>
                <Badge variant="secondary" className="text-xs">
                  {activityFilter.types.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="start">
              {(['note', 'call', 'task', 'meeting', 'file'] as ActivityType[]).map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={activityFilter.types.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleFilterChange([...activityFilter.types, type]);
                    } else {
                      handleFilterChange(activityFilter.types.filter(t => t !== type));
                    }
                  }}
                  className="capitalize"
                >
                  {type}s & Calls
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFilterChange(['note', 'call', 'task', 'meeting', 'file'])}>
                Select All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange([])}>
                Deselect All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Activity List */}
        <TabsContent value="all" className="flex-1 overflow-y-auto px-4 pb-4 mt-0">
          {displayedActivities.length > 0 ? (
            <div className="space-y-4">
              {displayedActivities.map((activity) => {
                const Icon = activityIcons[activity.type];
                const colorClass = activityColors[activity.type];
                
                return (
                  <div key={activity.id} className="flex gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', colorClass)}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-medium text-text truncate">
                          {activity.title}
                        </h4>
                        <span className="text-xs text-text-muted flex-shrink-0">
                          {formatDate(activity.createdOn)}
                        </span>
                      </div>
                      
                      {activity.description && (
                        <p className="text-xs text-text-muted line-clamp-2 mb-2">
                          {activity.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-muted">
                          {activity.createdBy.name}
                        </span>
                        
                        {activity.type === 'task' && activity.dueDate && (
                          <Badge 
                            variant={activity.completed ? 'secondary' : 'outline'} 
                            className="text-xs"
                          >
                            {activity.completed ? 'Completed' : 'Due Soon'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <FileText className="h-12 w-12 text-text-muted opacity-40 mb-4" />
              <h3 className="text-sm font-medium text-text mb-2">No activities yet</h3>
              <p className="text-xs text-text-muted mb-4">
                Start by adding a note, call log, or task
              </p>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Activity
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Other tab contents would be similar with filtered data */}
        <TabsContent value="notes" className="flex-1 overflow-y-auto px-4 pb-4 mt-0">
          {/* Notes-specific content */}
        </TabsContent>
        
        <TabsContent value="tasks" className="flex-1 overflow-y-auto px-4 pb-4 mt-0">
          {/* Tasks-specific content */}
        </TabsContent>
        
        <TabsContent value="meetings" className="flex-1 overflow-y-auto px-4 pb-4 mt-0">
          {/* Meetings-specific content */}
        </TabsContent>
        
        <TabsContent value="files" className="flex-1 overflow-y-auto px-4 pb-4 mt-0">
          {/* Files-specific content */}
        </TabsContent>
      </Tabs>
    </div>
  );
};
