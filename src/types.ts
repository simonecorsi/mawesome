import { Endpoints } from '@octokit/types';

export type SortedLanguageList = {
  [language: string]: Star[];
};

export type PaginationLink = {
  next: string;
  last: string | undefined | null;
};

export type Stars = Endpoints['GET /user/starred']['response']['data'];
export type Star = Stars[number] | { language: string };

export type ApiGetStarResponse = {
  links: PaginationLink;
  data: Stars;
};
