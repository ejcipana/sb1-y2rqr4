import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareLinkFieldProps {
  shareUrl: string;
  isVisible: boolean;
}

export function ShareLinkField({ shareUrl, isVisible }: ShareLinkFieldProps) {
  const [copied, setCopied] = useState(false);

  if (!isVisible) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="flex w-full items-center space-x-2 animate-fade-in">
      <input
        type="text"
        value={shareUrl}
        readOnly
        className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:outline-none"
      />
      <button
        onClick={handleCopy}
        className="flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Copy className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </div>
  );
}