export const getOficialArtwork = (image: string): string => {
  return image.replace("pokemon/", "pokemon/other/official-artwork/");
};

export const capitalize = (value: string): string => {
  const valueLower = value.toLocaleLowerCase();
  return valueLower.charAt(0).toUpperCase() + valueLower.slice(1);
};
