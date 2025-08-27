import { Plus, Mail, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const CompanyEmailsPage = () => {
  const mockEmails = [
    {
      id: '1',
      subject: 'Follow-up on Software Engineer Position',
      from: 'jessica@recruitcrm.com',
      to: 'sarah@techcorp.com',
      sentOn: '2024-01-15T10:30:00Z',
      isRead: true,
      snippet: 'Hi Sarah, I wanted to follow up on our conversation about the Senior Software Engineer role...',
    },
    {
      id: '2',
      subject: 'Job Description Template - Product Manager',
      from: 'jessica@recruitcrm.com',
      to: 'michael@techcorp.com',
      sentOn: '2024-01-12T14:15:00Z',
      isRead: true,
      snippet: 'Hi Michael, As requested, I\'ve attached the standardized job description template...',
    },
    {
      id: '3',
      subject: 'Candidate Recommendations for DevOps Role',
      from: 'jessica@recruitcrm.com',
      to: 'emily@techcorp.com',
      sentOn: '2024-01-10T09:20:00Z',
      isRead: false,
      snippet: 'Hi Emily, I have several excellent candidates that would be perfect for your DevOps Engineer...',
    },
  ];

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
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text">Related Emails</h2>
          <p className="text-text-muted">Email communications with this company</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Compose Email
        </Button>
      </div>

      <div className="space-y-3">
        {mockEmails.map((email) => (
          <div key={email.id} className="bg-card border border-border rounded-lg p-4 card-hover">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {email.from.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className={`text-sm font-medium truncate ${email.isRead ? 'text-text' : 'text-text font-semibold'}`}>
                      {email.subject}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                      <User className="h-3 w-3" />
                      <span>{email.from}</span>
                      <span>→</span>
                      <span>{email.to}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <Clock className="h-3 w-3" />
                      {formatDate(email.sentOn)}
                    </div>
                    {!email.isRead && (
                      <Badge variant="default" className="h-5 w-5 rounded-full p-0 bg-primary">
                        <span className="sr-only">Unread</span>
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-text-muted line-clamp-2">
                  {email.snippet}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};