import { atom } from 'recoil';

export const softwareAtom = atom<string[]>({
  key: 'softwareData',
  default: []
});

