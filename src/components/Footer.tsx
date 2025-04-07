
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-hair-medium bg-clip-text text-transparent">
            BeautyAI
          </h3>
          <p className="text-sm text-muted-foreground">
            AI-powered hair and skin analysis for personalized care recommendations.
          </p>
        </div>
        
        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-sm">Services</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/skin-analysis" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Skin Analysis
            </Link>
            <Link to="/hair-analysis" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Hair Analysis
            </Link>
            <Link to="/connect-doctor" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Connect to Experts
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-sm">Company</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-sm">Join Our Community</h4>
          <p className="text-sm text-muted-foreground">
            Subscribe for updates on new features and beauty tips.
          </p>
          <div className="flex gap-2 mt-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-3 py-2 rounded-md border text-sm flex-1" 
            />
            <button className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-md text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mt-8 pt-4 border-t">
        <p className="text-xs text-center text-muted-foreground">
          © {new Date().getFullYear()} BeautyAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
