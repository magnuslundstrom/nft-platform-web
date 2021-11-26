export interface NavLinkT {
  label: string;
  url: string;
}

const marketplace: NavLinkT = {
  label: 'Marketplace',
  url: '/marketplace',
};

const profile: NavLinkT = {
  label: 'Profile',
  url: '/profile/#account',
};

export const unauthorizedLinks = [marketplace];
export const authorizedLinks = [marketplace, profile];
