import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  onTryDemo?: () => void;
}

export function Navigation({ onTryDemo }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl text-blue-900">VirtualStaging</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#gallery" className="text-gray-700 hover:text-blue-600 transition-colors">Gallery</a>
            <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">Benefits</a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex gap-3">
            {onTryDemo && (
              <button
                onClick={onTryDemo}
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Try Demo
              </button>
            )}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#features" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">Features</a>
            <a href="#gallery" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">Gallery</a>
            <a href="#benefits" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">Benefits</a>
            <a href="#faq" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">FAQ</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">Contact</a>
            {onTryDemo && (
              <button
                onClick={onTryDemo}
                className="w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
              >
                Try Demo
              </button>
            )}
            <button className="w-full mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}