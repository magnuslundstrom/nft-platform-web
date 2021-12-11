export const sleep = async (timeout) =>
  new Promise((resolve) => setTimeout(() => resolve()), timeout);
