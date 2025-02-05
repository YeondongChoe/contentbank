import { atom } from 'recoil';

type Authority = {
  isManage: boolean;
  isEdit: boolean;
};

type MyAuthority = {
  AM?: Authority;
  CCC?: Authority;
  CMC?: Authority;
  IM?: Authority;
  MIM?: Authority;
  PM?: Authority;
  QE?: Authority;
  QM?: Authority;
  RM?: Authority;
  WE?: Authority;
};

// Declare the atom with the correct type
export const myAuthorityAtom = atom<MyAuthority>({
  key: 'myAuthorityAtom',
  default: {},
});
