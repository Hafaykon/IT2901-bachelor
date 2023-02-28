import {atom} from 'recoil';

interface UserData {
    id: number;
    email: string;
    full_name: string;
    active_minutes: number;

    total_minutes: number;

}

export const softwareAtom = atom<string[]>({
    key: 'softwareData',
    default: []
});


export const orgAtom = atom<string>({
    key: 'organization',
    default: ''
});

export const softwareUserAtom = atom<UserData[]>({
    key: 'softwareUserData',
    default: []
})

