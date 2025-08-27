import { Plus, User, Briefcase, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const CompanyPitchedPage = () => {
  const mockCandidates = [
    {
      id: '1',
      name: 'Alex Thompson',
      title: 'Senior Software Engineer',
      email: 'alex.thompson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      pitchedFor: 'Senior Software Engineer',
      pitchedOn: '2024-01-12T10:00:00Z',
      status: 'Interview Scheduled',
      experience: '8 years',
    },
    {
      id: '2',
      name: 'Maria Rodriguez',
      title: 'Full Stack Developer',
      email: 'maria.rodriguez@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Austin, TX',
      pitchedFor: 'Senior Software Engineer',
      pitchedOn: '2024-01-10T14:30:00Z',
      status: 'Under Review',
      experience: '6 years',
    },
    {
      id: '3',
      name: 'David Chen',
      title: 'Product Manager',
      email: 'david.chen@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Seattle, WA',
      pitchedFor: 'Product Manager',
      pitchedOn: '2024-01-08T09:15:00Z',
      status: 'Rejected',
      experience: '5 years',
    },
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'bg-success/10 text-success border-success/20';
      case 'Under Review':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Rejected':
        return 'bg-text-muted/10 text-text-muted border-text-muted/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text">Candidate(s) Pitched</h2>
          <p className="text-text-muted">Candidates presented to this company</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Pitch Candidate
        </Button>
      </div>

      <div className="space-y-4">
        {mockCandidates.map((candidate) => (
          <div key={candidate.id} className="bg-card border border-border rounded-lg p-6 card-hover">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-text">{candidate.name}</h3>
                    <p className="text-text-muted">{candidate.title}</p>
                  </div>
                  <Badge className={getStatusBadgeColor(candidate.status)}>
                    {candidate.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <User className="h-4 w-4" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <MapPin className="h-4 w-4" />
                      <span>{candidate.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Briefcase className="h-4 w-4" />
                      <span>Pitched for: {candidate.pitchedFor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Clock className="h-4 w-4" />
                      <span>Pitched on: {formatDate(candidate.pitchedOn)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant="outline">
                    {candidate.experience} experience
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};