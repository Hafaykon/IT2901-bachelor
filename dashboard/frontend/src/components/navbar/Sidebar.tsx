import {useRecoilState, useSetRecoilState} from "recoil";
import {isAuthAtom} from "../../globalVariables/variables";


export const SidebarData = [

    {
        title: 'Mitt dashboard',
        path: '/',

        cName: 'nav-text'
    },
    {
        title: 'Min side',
        path: '/minside',

        cName: 'nav-text'
    },
    {
        title: 'Lisensportalen',
        path: '/lisensportal',

        cName: 'nav-text'
    },
    {
        title: 'FAQ',
        path: '/FAQ',

        cName: 'nav-text'
    },
    {
        title: 'Logg ut',
        path: '/',
        cName: 'nav-text',
        onClick: () => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            const setAuth = useSetRecoilState(isAuthAtom);
            setAuth(false);
        }
    }
];