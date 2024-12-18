import React from 'react';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isAnimating: boolean;
}

export function SearchBox({ searchTerm, onSearchChange, isAnimating }: SearchBoxProps) {
  return (
    <div className="relative w-full max-w-2xl">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`w-full px-4 py-3 pr-12 text-lg rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
          isAnimating ? 'cursor-not-allowed' : ''
        }`}
        placeholder="Napíšte, čo chcete vyhľadať..."
        disabled={isAnimating}
      />
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
    </div>
  );
}