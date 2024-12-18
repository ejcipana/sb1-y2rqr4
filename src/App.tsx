import React, { useState, useEffect } from 'react';
import { SearchBox } from './components/SearchBox';
import { AnimatedCursor } from './components/AnimatedCursor';
import { Button } from './components/Button';
import { ShareLinkField } from './components/ShareLinkField';
import { GoogleLogo } from './components/GoogleLogo';
import { Toast } from './components/Toast';
import { SocialIcons } from './components/SocialIcons';
import { BuyMeCoffee } from './components/BuyMeCoffee';
import { simulateTyping, PAUSE_BEFORE_SEARCH, sleep } from './utils/animations';
import { getSearchTermFromUrl, createShareUrl } from './utils/url';
import { useToast } from './hooks/useToast';
import { Search } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    const urlSearchTerm = getSearchTermFromUrl();
    if (urlSearchTerm) {
      startAnimation(urlSearchTerm);
    }
  }, []);

  const startAnimation = async (term: string) => {
    setIsAnimating(true);
    setShowCursor(true);
    setShowShareLink(false);

    // Move cursor to search box
    const searchBox = document.querySelector('input');
    if (searchBox) {
      const rect = searchBox.getBoundingClientRect();
      setCursorPosition({ x: rect.left + 10, y: rect.top + rect.height / 2 });
      await sleep(1000);

      // Clear existing text
      setSearchTerm('');
      await sleep(500);

      // Type the search term
      await simulateTyping(term, setSearchTerm);
      await sleep(PAUSE_BEFORE_SEARCH);

      // Redirect to Google search
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(term)}`;
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setShowShareLink(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <AnimatedCursor position={cursorPosition} isVisible={showCursor} />
      
      <div className="text-center mb-8">
        <GoogleLogo />
        <h1 className="text-3xl font-normal text-gray-800 mb-2">
          Vygooglím to za teba
        </h1>
        <p className="text-gray-600">
          Ukážem ti, ako sa používa Google
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isAnimating={isAnimating}
        />

        <div className="flex justify-center">
          <Button
            onClick={handleSearch}
            disabled={!searchTerm.trim() || isAnimating}
          >
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Vyhľadať na Google</span>
            </div>
          </Button>
        </div>

        <ShareLinkField
          shareUrl={createShareUrl(searchTerm)}
          isVisible={showShareLink}
        />

        <div className="bg-sky-100 p-4 rounded-lg text-sky-800 text-center font-medium">
          {showShareLink ? 'Skopírujte odkaz a zdieľajte!' : 'Napíšte text a Vyhľadajte!'}
        </div>

        <SocialIcons />
      </div>

      <BuyMeCoffee />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}

export default App;