export interface NavLinkT {
  label: string;
  url: string;
}

const profile: NavLinkT = {
  label: 'Profile',
  url: '/profile/#account',
};

export const unauthorizedLinks = [];
export const authorizedLinks = [profile];
