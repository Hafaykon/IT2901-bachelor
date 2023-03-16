import {atom} from 'recoil';
import {LicensePoolData} from '../Interfaces';


export const softwareAtom = atom<string[]>({
    key: 'softwareData',
    default: []
});


export const orgAtom = atom<string>({
    key: 'organization',
    default: ''
});

export const softwareUserAtom = atom<LicensePoolData[]>({
    key: 'softwareUserData',
    default: []
})


