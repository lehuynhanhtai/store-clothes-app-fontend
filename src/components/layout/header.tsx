'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/app/_components/search-bar';
import ShoppingCart from './shopping-cart';
import { Session } from '@/lib/session';

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Men', href: '/products/men' },
    { name: 'Women', href: '/products/women' },
    { name: 'New Arrivals', href: '/products/new-arrivals' },
    { name: 'Sale', href: '/products/sale' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm dark:bg-gray-950' : 'bg-white dark:bg-gray-950'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            MINIMALIST
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-black/70 dark:hover:text-white/70 ${
                  pathname === item.href ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {session ? (
              <div>
                {/* Cart */}
                <ShoppingCart />
                <span>{session.user.account}</span>
                <Link href={'/api/auth/signout'}>Thoat</Link>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button variant="ghost" size="icon" className="relative cursor-pointer">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mt-4 space-y-4 md:hidden">
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-sm font-medium transition-colors hover:text-black/70 dark:hover:text-white/70 ${
                  pathname === item.href ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
      {/* Search Bar */}
      {isSearchOpen && (
        <div className="absolute w-full border-t">
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
