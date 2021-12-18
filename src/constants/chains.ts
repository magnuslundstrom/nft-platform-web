import { TARGET_ENV } from './env';

export const chains = {
  dev: [1337],
  staging: [3],
  prod: [1],
};

export const currentChains = chains[TARGET_ENV];
