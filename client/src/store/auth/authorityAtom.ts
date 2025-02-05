import { atom } from 'recoil';

type AuthorityType = {
  code: string;
  idx: number;
  name: string;
};

export const authorityAtom = atom<AuthorityType>({
  key: 'authorityAtom',
  default: {
    code: '',
    idx: 0,
    name: '',
  },
});
