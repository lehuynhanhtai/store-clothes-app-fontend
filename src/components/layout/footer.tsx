import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">MINIMALIST</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Minimalist fashion for the modern individual. Quality essentials that stand the test of time.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products/men" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/products/women" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/products/new-arrivals" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products/sale" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/customer-service" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} MINIMALIST. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs text-gray-600 dark:text-gray-400">
              <Link href="/privacy-policy" className="hover:text-black dark:hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-black dark:hover:text-white">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="hover:text-black dark:hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;