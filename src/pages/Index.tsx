import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  // Auto-redirect to demo company profile for better demo experience
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/company/1');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              RecruitCRM
            </h1>
          </div>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Professional recruitment management system with comprehensive company profiles, 
            job management, and candidate tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Company Profiles
              </CardTitle>
              <CardDescription>
                Comprehensive company information with inline editing and contact management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• Complete company details</li>
                <li>• Contact management</li>
                <li>• Activity tracking</li>
                <li>• Inline editing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Job Management
              </CardTitle>
              <CardDescription>
                Advanced job posting management with candidate pipeline tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• Job status tracking</li>
                <li>• Candidate pipelines</li>
                <li>• Advanced filtering</li>
                <li>• Performance metrics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Candidate Tracking
              </CardTitle>
              <CardDescription>
                Full candidate lifecycle from pitch to placement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• Candidate presentations</li>
                <li>• Placement tracking</li>
                <li>• Status management</li>
                <li>• Success metrics</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Redirecting to demo company profile...
            </div>
          </div>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/company/1')}
            className="gap-2"
          >
            View Demo Company Profile
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <p className="text-xs text-text-muted mt-4">
            Featuring TechCorp Solutions with sample data
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
