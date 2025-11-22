import React from 'react';
import { useLocation } from 'react-router-dom';
import { SmoothLink } from '@/components/SmoothLink';
import { Menu, X, User, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Skin Analysis', path: '/skin-analysis' },
    { name: 'Hair Analysis', path: '/hair-analysis' },
    { name: 'Find a Doctor', path: '/connect-doctor' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container-width flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <SmoothLink to="/" delay={400} className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Stethoscope className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl text-foreground tracking-tight">
              Derma<span className="text-primary">Care</span> AI
            </span>
          </SmoothLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <SmoothLink
              key={link.path}
              to={link.path}
              delay={600}
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
            >
              {link.name}
            </SmoothLink>
          ))}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <SmoothLink to="/profile" delay={600} className="w-full">Profile</SmoothLink>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild className="font-semibold">
            <SmoothLink to="/get-started" delay={700}>Book Appointment</SmoothLink>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white p-4 space-y-4 animate-accordion-down">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <SmoothLink
                key={link.path}
                to={link.path}
                delay={600}
                className={`text-base font-medium py-2 border-b border-border/50 ${isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </SmoothLink>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <SmoothLink to="/profile" delay={600}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </SmoothLink>
              </Button>
              <Button className="w-full" asChild>
                <SmoothLink to="/get-started" delay={700}>Book Appointment</SmoothLink>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
