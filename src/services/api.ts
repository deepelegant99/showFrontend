const BASE_URL = "https://api.tvmaze.com";

type TVMazeImage = {
  medium?: string;
  original?: string;
};

type TVMazeShow = {
  id: number;
  name: string;
  premiered: string | null;
  image: TVMazeImage | null;
};

type TVMazeSearchResult = {
  show: TVMazeShow;
};

export type Show = {
  id: number;
  name: string;
  imageUrl: string;
  premiered: string;
};

const mapShowToCard = (show: TVMazeShow): Show => ({
  id: show.id,
  name: show.name,
  imageUrl: show.image?.medium ?? show.image?.original ?? "",
  premiered: show.premiered ?? "Unknown",
});

export const getShows = async (): Promise<Show[]> => {
  const response = await fetch(`${BASE_URL}/shows?page=1`);

  if (!response.ok) {
    throw new Error(`Failed to fetch shows: ${response.status}`);
  }

  const data: TVMazeShow[] = await response.json();
  return data.map(mapShowToCard);
};

export const searchShows = async (query: string): Promise<Show[]> => {
  const response = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to search shows: ${response.status}`);
  }

  const data: TVMazeSearchResult[] = await response.json();
  return data.map((result) => mapShowToCard(result.show));
};
