export const getOficialArtwork = (image: string): string => {
  return image.replace("pokemon/", "pokemon/other/official-artwork/");
};
