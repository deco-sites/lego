export const resizeVtexImage = (
  src: string,
  width: number | string,
  height: number | string,
) => {
  const regex = /\/ids\/(\d+)\//;
  const match = src.match(regex);

  if (!match) {
    return src;
  }

  const id = match[1];
  const newUrl = src.replace(id, `${id}-${width}-${height}`);
  return newUrl;
};
