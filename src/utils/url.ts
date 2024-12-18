export function getSearchTermFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get('q') || '';
}

export function createShareUrl(searchTerm: string): string {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?q=${encodeURIComponent(searchTerm)}`;
}