import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

const PlaceholderPage = () => {
    const location = useLocation();
    const pageName = location.pathname.substring(1).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <main className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full">
                    <div className="bg-primary/10 p-4 rounded-full inline-flex mb-6">
                        <Construction className="h-10 w-10 text-primary" />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 mb-2">
                        {pageName || 'Page'} Under Construction
                    </h1>

                    <p className="text-slate-600 mb-8">
                        We're currently working on the <strong>{pageName}</strong> page.
                        Please check back soon for updates.
                    </p>

                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <Link to="/">Return Home</Link>
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default PlaceholderPage;
