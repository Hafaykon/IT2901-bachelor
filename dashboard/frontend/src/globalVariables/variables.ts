import {atom} from 'recoil';
import {LicensePoolData, UserInformation} from '../Interfaces';





export const orgAtom = atom<string>({
    key: 'organization',
    default: ''
});


export const isAuthAtom = atom<boolean>({
    key: 'isAuthenticated',
    default: false
})

export const userAtom = atom<UserInformation>({
    key: 'user',
    default: {
        primary_user_email: '',
        organization: '',
        is_unit_head: false,
    }

})

