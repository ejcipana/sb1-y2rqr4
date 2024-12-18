import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from './Button';
import { createShareUrl } from '../utils/url';
import { useToast } from '../hooks/useToast';

interface ShareButtonProps {
  searchTerm: string;
  disabled: boolean;
}

export function ShareButton({ searchTerm, disabled }: ShareButtonProps) {
  const { showToast } = useToast();

  const handleShare = async () => {
    const shareUrl = createShareUrl(searchTerm);
    
    try {
      if (navigator.share && navigator.canShare?.({ url: shareUrl })) {
        await navigator.share({
          title: 'Vygooglím to za teba',
          text: 'Pozri sa, ako sa používa Google!',
          url: shareUrl,
        });
        showToast('Odkaz bol úspešne zdieľaný!', 'success');
      } else {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Odkaz bol skopírovaný do schránky!', 'success');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      showToast('Nepodarilo sa zdieľať odkaz. Skúste to znova.', 'error');
    }
  };

  return (
    <Button
      onClick={handleShare}
      disabled={disabled}
      variant="secondary"
    >
      <div className="flex items-center space-x-2">
        <Share2 className="w-5 h-5" />
        <span>Zdieľať</span>
      </div>
    </Button>
  );
}