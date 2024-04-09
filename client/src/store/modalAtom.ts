import * as React from 'react';

import { atom } from 'recoil';

type ModalType = {
  isOpen: boolean;
  title: string;
  content: React.ReactElement | string;
  callBack?: () => void;
};

export const modalState = atom<ModalType>({
  key: 'modalAtom',
  default: {
    isOpen: false,
    title: '',
    content: '',
  },
});
