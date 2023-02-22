import { atom } from 'recoil';

interface Organization {
  id: number;
  name: string | null;
}

export const softwareAtom = atom<string[]>({
  key: 'softwareData',
  default: []
});

