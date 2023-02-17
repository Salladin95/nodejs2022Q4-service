const getFavsKey = {
  artist: () => 'favoriteArtist',
  album: () => 'favoriteAlbum',
  track: () => 'favoriteTrack',
};

const getDataObj = (id: string) => ({ data: { id } });

export { getFavsKey, getDataObj };
