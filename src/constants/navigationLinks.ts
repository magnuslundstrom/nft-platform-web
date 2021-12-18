export interface NavLinkT {
  label: string;
  url: string;
}

const profile: NavLinkT = {
  label: 'Profile',
  url: '/profile/#account',
};

const mint: NavLinkT = {
  label: 'Mint',
  url: '/mint',
};

export const unauthorizedLinks = [];
export const authorizedLinks = [mint, profile];
