export const fetchGenericJson = (url: string) =>
  fetch(url).then((res) => res.json());
