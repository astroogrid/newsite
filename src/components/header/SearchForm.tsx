
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SearchDropdown from './SearchDropdown';
import { useSearch } from '@/hooks/useSearch';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, searchResults, isLoading } = useSearch();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(query.trim())}`);
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsDropdownOpen(value.trim().length > 0);
  };

  const handleInputFocus = () => {
    if (query.trim()) {
      setIsDropdownOpen(true);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="hidden md:flex relative w-full max-w-xs lg:max-w-sm xl:w-80">
      <form onSubmit={handleSearchSubmit} className="w-full relative">
        <Input
          ref={inputRef}
          placeholder="Search products..."
          className="pl-10 pr-4 py-2 h-9 sm:h-10 text-sm rounded-full border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 w-full bg-white"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </form>
      
      <SearchDropdown
        isOpen={isDropdownOpen}
        searchResults={searchResults}
        isLoading={isLoading}
        onClose={closeDropdown}
        query={query}
      />
    </div>
  );
};

export default SearchForm;
