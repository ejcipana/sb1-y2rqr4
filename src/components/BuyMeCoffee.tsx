import React from 'react';
import { Coffee } from 'lucide-react';

export function BuyMeCoffee() {
  return (
    <a
      href="https://buymeacoffee.com/samuelbartos"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 flex items-center gap-2 px-4 py-2 bg-[#FFDD00] text-gray-900 rounded-full hover:bg-[#FFED4A] transition-colors shadow-md"
    >
      <Coffee className="w-5 h-5" />
      <span className="font-medium">Buy me a coffee</span>
    </a>
  );
}