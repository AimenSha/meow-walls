export interface Breed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Breed[];
}

const BASE_URL = 'https://api.thecatapi.com/v1';

export async function fetchImages(page = 0, limit = 40, breedId?: string): Promise<CatImage[]> {
  const url = new URL(`${BASE_URL}/images/search`);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('page', page.toString());
  url.searchParams.append('has_breeds', '1');
  url.searchParams.append('size', 'full');
  if (breedId && breedId !== 'all') {
    url.searchParams.append('breed_ids', breedId);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch images');
  return res.json();
}

export async function fetchBreeds(): Promise<Breed[]> {
  const res = await fetch(`${BASE_URL}/breeds`);
  if (!res.ok) throw new Error('Failed to fetch breeds');
  return res.json();
}

export async function fetchBreedDetails(breedId: string): Promise<Breed | undefined> {
  const breeds = await fetchBreeds();
  return breeds.find(b => b.id === breedId);
}

export async function fetchBreedImage(breedId: string): Promise<CatImage | null> {
  const url = new URL(`${BASE_URL}/images/search`);
  url.searchParams.append('limit', '1');
  url.searchParams.append('breed_ids', breedId);
  url.searchParams.append('size', 'full');
  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = await res.json();
  return data[0] ?? null;
}

export async function downloadImage(url: string, filename: string) {
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error('fetch failed');
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
  } catch {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
