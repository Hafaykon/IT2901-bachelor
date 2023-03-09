import { atom } from 'recoil';
import { SoftwareUser, UserData } from '../Interfaces';




export const softwareAtom = atom<string[]>({
    key: 'softwareData',
    default: []
});


export const orgAtom = atom<string>({
    key: 'organization',
    default: ''
});

export const softwareUserAtom = atom<SoftwareUser[]>({
    key: 'softwareUserData',
    default: []
})

export const softwareDataAtom = atom<UserData[]>({
    key: 'softwareData2',
    default: []
})


