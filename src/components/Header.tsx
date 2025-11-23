import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container-width flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <SmoothLink to="/" delay={400} className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors duration-200"
              >
                <Stethoscope className="h-6 w-6 text-primary" />
              </motion.div>
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
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-primary ${isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                )}
              </SmoothLink>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full transition-all duration-200 hover:bg-primary/10">
                  <User className="h-5 w-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer">
                  <SmoothLink to="/profile" delay={600} className="w-full">Profile</SmoothLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild className="font-semibold transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]">
              <SmoothLink to="/get-started" delay={700}>Book Appointment</SmoothLink>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-muted-foreground rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="md:hidden border-t bg-white overflow-hidden"
            >
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="p-4 space-y-4"
              >
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <SmoothLink
                        to={link.path}
                        delay={600}
                        className={`block text-base font-medium py-3 px-4 rounded-lg transition-all duration-200 ${isActive(link.path)
                            ? 'text-primary bg-primary/10'
                            : 'text-muted-foreground hover:bg-slate-50'
                          }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </SmoothLink>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-4 flex flex-col gap-3 border-t">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <SmoothLink to="/profile" delay={600}>
                      <User className="mr-2 h-4 w-4" /> Profile
                    </SmoothLink>
                  </Button>
                  <Button className="w-full" asChild>
                    <SmoothLink to="/get-started" delay={700}>Book Appointment</SmoothLink>
                  </Button>
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <div className="h-20" aria-hidden="true" />
    </>
  );
};

export default Header;
