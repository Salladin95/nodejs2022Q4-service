import { FavsEntityOption } from './contracts';

const getFavsKey: Record<FavsEntityOption, () => string> = {
  artist: () => 'favoriteArtist',
  album: () => 'favoriteAlbum',
  track: () => 'favoriteTrack',
};

const getDataObj = (id: string) => ({ data: { id } });

export { getFavsKey, getDataObj };
