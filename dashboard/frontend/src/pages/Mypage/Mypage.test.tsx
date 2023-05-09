import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Mypage from './Mypage';
import {fetchInfoBoxData} from '../../api/calls';
import {RecoilRoot} from 'recoil';
import {userAtom} from "../../globalVariables/variables";
import {BrowserRouter} from "react-router-dom";
import 'isomorphic-fetch';
import renderer from 'react-test-renderer';

const infoBoxData = {
    "total_licenses": 7,
    "active_licenses": 0,
    "never_used": 5,
    "unused_licenses": 2,
    "available_licenses": 0
}

const renderWithRecoil = (
    ui: React.ReactElement,
    initialState: any
) => {
    return render(
        <RecoilRoot
            initializeState={({set}) => set(userAtom, initialState)}
        >
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </RecoilRoot>
    );
};
const renderWithRecoilSnapshot = (ui: React.ReactElement, initialState: any) => {
    return renderer.create(
        <RecoilRoot
            initializeState={({set}) => set(userAtom, initialState)}
        >
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </RecoilRoot>
    );
};


jest.mock('../../api/calls', () => ({
    fetchInfoBoxData: jest.fn()
}));


const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key: jest.fn()
};

Object.defineProperty(global, 'localStorage', {value: localStorageMock});

describe('MyPage component', () => {
    beforeEach(() => {
        (fetchInfoBoxData as jest.Mock).mockReturnValueOnce([infoBoxData]);
        (localStorage.getItem as jest.Mock).mockReturnValueOnce('fakeToken');
    });


    afterEach(() => {
        jest.clearAllMocks();
    });


    it('renders loading spinner when data is not fetched', async () => {
        renderWithRecoil(<Mypage/>, {primary_user_full_name: 'Bertil Nedregård'});

        await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument(), {timeout: 3000});
    });


    it('renders when data has been loaded', async () => {
        renderWithRecoil(<Mypage/>, {primary_user_full_name: 'Bertil Nedregård'});

        await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Bertil Nedregård')).toBeInTheDocument(), {timeout: 3000});
    });


    it('renders request history when checkbox is checked', async () => {
        renderWithRecoil(<Mypage/>, {primary_user_full_name: 'Bertil Nedregård', is_unit_head: false});

        await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument());

        const checkbox = await waitFor(() => screen.getByLabelText('Vis historikk'), {timeout: 3000})
        fireEvent.click(checkbox);

        await waitFor(() => expect(screen.getByText('Prossesert dato')).toBeInTheDocument());
    });
    it('matches snapshot', async () => {
        (fetchInfoBoxData as jest.Mock).mockReturnValueOnce([infoBoxData]);
        (localStorage.getItem as jest.Mock).mockReturnValueOnce('fakeToken');

        const testRenderer = renderWithRecoilSnapshot(<Mypage/>, {primary_user_full_name: 'Bertil Nedregård'});
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

});
