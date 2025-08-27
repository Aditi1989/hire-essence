import { useState, useRef, useEffect } from 'react';
import { Search, Command } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const TopSearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for "/" key to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const mockResults = [
    { type: 'Company', name: 'TechCorp Solutions', id: '1' },
    { type: 'Company', name: 'InnovateTech Inc.', id: '2' },
    { type: 'Contact', name: 'Sarah Johnson', id: '3' },
    { type: 'Job', name: 'Senior Software Engineer', id: '4' },
  ];

  const filteredResults = mockResults.filter(result =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[770] bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-12">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                ref={inputRef}
                placeholder="Search companies, contacts, jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={handleInputClick}
                className="pl-10 pr-20 h-9 border-border focus:ring-primary focus:border-primary"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-text-muted">
                <Command className="h-3 w-3" />
                <span>/</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl p-0 gap-0">
          <div className="border-b border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                placeholder="Search companies, contacts, jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0 focus:ring-0 text-base"
                autoFocus
              />
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredResults.length > 0 ? (
              <div className="p-2">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => {
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-sm font-medium">
                        {result.type.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{result.name}</div>
                      <div className="text-xs text-text-muted">{result.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-text-muted">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-40" />
                <p>No results found</p>
                <p className="text-sm mt-1">Try searching for companies, contacts, or jobs</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};