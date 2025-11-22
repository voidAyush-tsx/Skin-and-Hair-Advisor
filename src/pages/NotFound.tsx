import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileSearch, ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="text-center space-y-6 max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="bg-slate-100 p-6 rounded-full inline-flex mb-2">
          <FileSearch className="h-12 w-12 text-slate-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Page Not Found</h1>
          <p className="text-slate-500">
            We couldn't find the clinical resource you were looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50">
            <Link to="/get-started">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-slate-400">
        <p>&copy; 2025 Skin & Hair AI Advisor. All rights reserved.</p>
      </div>
    </div>
  );
};

export default NotFound;
