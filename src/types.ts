import { Endpoints } from '@octokit/types';

export type SortedLanguageList = {
  [language: string]: Star[];
};

export type PaginationLink = {
  uri: string;
  rel: 'next' | 'last' | 'prev' | 'first';
};

export type Stars = Endpoints['GET /user/starred']['response']['data'];
export type Star = Stars[number] | { language: string };

export type ApiGetStarResponse = Stars;
