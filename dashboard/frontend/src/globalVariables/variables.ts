import { atom } from 'recoil';
import SoftwareUser from "../Interfaces";

interface UserData {
    id: number;
    active_minutes: number;
    email: string;
    organization: string;
    full_name: string;
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

export const softwareUserAtom = atom<SoftwareUser[]>({
    key: 'softwareUserData',
    default: []
})

