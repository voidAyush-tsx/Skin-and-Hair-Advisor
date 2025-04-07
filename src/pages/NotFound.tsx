
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileSearch } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/20 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="bg-primary/10 p-4 rounded-full inline-flex mb-4">
          <FileSearch className="h-12 w-12 text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">Page Not Found</h1>
        
        <p className="text-muted-foreground md:text-xl/relaxed">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-4">
          <Button asChild size="lg">
            <Link to="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/get-started">Start Analysis</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
