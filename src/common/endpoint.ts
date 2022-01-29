import { BASEPATH } from '../constants/default.constants';

export const getEndpoint = (path: string): string => {
  return BASEPATH + '/' + path;
};
