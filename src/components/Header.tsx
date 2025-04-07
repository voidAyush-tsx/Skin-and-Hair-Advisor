
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Menu } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-hair-medium bg-clip-text text-transparent">
              BeautyAI
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/skin-analysis" className="text-sm font-medium transition-colors hover:text-primary">
            Skin Analysis
          </Link>
          <Link to="/hair-analysis" className="text-sm font-medium transition-colors hover:text-primary">
            Hair Analysis
          </Link>
          <Link to="/connect-doctor" className="text-sm font-medium transition-colors hover:text-primary">
            Find Experts
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="hidden md:flex">
            <Link to="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/skin-analysis">Skin Analysis</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/hair-analysis">Hair Analysis</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/connect-doctor">Find Experts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button asChild className="hidden md:flex">
            <Link to="/get-started">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
