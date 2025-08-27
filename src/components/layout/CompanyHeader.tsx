import { useState } from 'react';
import { Building2, Globe, MapPin, Upload, Copy, MoreHorizontal, UserPlus, Edit, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCompanyStore } from '@/store/useCompanyStore';
import { toast } from '@/hooks/use-toast';

export const CompanyHeader = () => {
  const { currentCompany } = useCompanyStore();
  const [isSticky, setIsSticky] = useState(false);

  if (!currentCompany) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(currentCompany.id);
    toast({
      title: "Copied to clipboard",
      description: "Company ID copied successfully",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`sticky top-12 z-[760] bg-surface border-b border-border transition-shadow duration-200 ${isSticky ? 'sticky-shadow' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 py-3 text-sm text-text-muted">
          <span>Companies</span>
          <span>›</span>
          <span>Page 1</span>
          <span>›</span>
          <span className="text-text">ID – {currentCompany.id}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyId}
            className="h-6 w-6 p-0 ml-1"
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>

        {/* Company Header */}
        <div className="flex items-start justify-between py-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative group">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentCompany.avatarUrl} />
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                  {currentCompany.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/50 text-white transition-opacity rounded-full"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Upload company logo</TooltipContent>
              </Tooltip>
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-text mb-1">{currentCompany.name}</h1>
                  <p className="text-sm text-text-muted mb-3 font-medium">Talent CRM Simplified</p>
                  
                  {/* Quick Info */}
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
                    {currentCompany.website && (
                      <a
                        href={currentCompany.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        Website
                      </a>
                    )}
                    {currentCompany.fullAddress && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {currentCompany.locality}, {currentCompany.state}
                      </div>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="text-xs">
                      Owner: {currentCompany.owner.name}
                    </Badge>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="text-xs text-text-muted p-0 h-auto hover:text-primary">
                          Updated on {formatDate(currentCompany.updatedOn)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64" align="start">
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Created:</span> {formatDate(currentCompany.createdOn)}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Last Updated:</span> {formatDate(currentCompany.updatedOn)}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Owner:</span> {currentCompany.owner.name}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-2" />
              Add to Hotlist
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>View Parent Company</DropdownMenuItem>
                <DropdownMenuItem>View Child Companies</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Merge Company</DropdownMenuItem>
                <DropdownMenuItem>Mark Off-Limits</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-danger">Delete Company</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Contacts Section */}
        <div className="pb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text">Contacts</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Select Existing Contact</DropdownMenuItem>
                <DropdownMenuItem>Add New Contact</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center gap-2">
            {currentCompany.contacts.map((contact, index) => (
              <Tooltip key={contact.id}>
                <TooltipTrigger asChild>
                  <Avatar 
                    className={`h-8 w-8 border-2 border-surface ${index > 0 ? '-ml-2' : ''} cursor-pointer hover:z-10 transition-transform hover:scale-110`}
                  >
                    <AvatarImage src={contact.avatarUrl} />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {contact.initials}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    {contact.email && <div className="text-xs text-text-muted">{contact.email}</div>}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
            
            {currentCompany.contacts.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 rounded-full p-0 -ml-2 border-2 border-surface"
              >
                <Users className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};