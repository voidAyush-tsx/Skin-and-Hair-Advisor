import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-white border-t pt-16 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                B
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                BeautyAI
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Revolutionizing personal care with AI-powered analysis. Get expert insights for your skin and hair health journey.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Services</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/skin-analysis" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Skin Analysis
                </Link>
              </li>
              <li>
                <Link to="/hair-analysis" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Hair Analysis
                </Link>
              </li>
              <li>
                <Link to="/connect-doctor" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Find Experts
                </Link>
              </li>
              <li>
                <Link to="/get-started" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> AI Consultation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to get the latest beauty tips and AI feature updates.
            </p>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <Button className="w-full rounded-lg shadow-md">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BeautyAI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
