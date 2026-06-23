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

export async function fetchImages(page = 0, limit = 20, breedId?: string): Promise<CatImage[]> {
  const url = new URL(`${BASE_URL}/images/search`);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('page', page.toString());
  url.searchParams.append('has_breeds', '1');
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

export async function downloadImage(url: string, filename: string) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Failed to download image', error);
  }
}
