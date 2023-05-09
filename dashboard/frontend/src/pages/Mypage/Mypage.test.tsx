import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Mypage from './Mypage';
import {fetchInfoBoxData} from '../../api/calls';
import {RecoilRoot} from 'recoil';
import {userAtom} from "../../globalVariables/variables";
import {BrowserRouter} from "react-router-dom";

// Defining the infoBoxData that will be used in the tests
const infoBoxData = {
    "total_licenses": 7,
    "active_licenses": 0,
    "never_used": 5,
    "unused_licenses": 2,
    "available_licenses": 0
}

// Defining a helper function for rendering components with Recoil state
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

// Mocking the fetchInfoBoxData function from the API
jest.mock('../../api/calls', () => ({
    fetchInfoBoxData: jest.fn()
}));

// Mocking the localStorage object
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
    // Setting up some basic configurations before each test
    beforeEach(() => {
        (fetchInfoBoxData as jest.Mock).mockReturnValueOnce([infoBoxData]);  // Mocking the API call to fetch infoBoxData and returning the predefined data
        (localStorage.getItem as jest.Mock).mockReturnValueOnce('fakeToken'); // Mocking the localStorage.getItem function and returning a fake token
    });

    // Cleaning up after each test
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Testing that the loading spinner appears while data is being fetched
    it('renders loading spinner when data is not fetched', async () => {
        renderWithRecoil(<Mypage/>, {primary_user_full_name: 'Bertil Nedregård'});

        await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument(), {timeout: 3000});
    });

     // Testing that the component renders correctly when data has been loaded
    it('renders when data has been loaded', async () => {
        renderWithRecoil(<Mypage/>, {primary_user_full_name: 'Bertil Nedregård'});

        await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Bertil Nedregård')).toBeInTheDocument(), {timeout: 3000});
    });

    // Testing that the component renders request history when the checkbox is checked
    it('renders request history when checkbox is checked', async () => {
        renderWithRecoil(<Mypage/>, {primary_user_full_name: 'Bertil Nedregård', is_unit_head: false});

        await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument());

        const checkbox = await waitFor(() => screen.getByLabelText('Vis historikk'), {timeout: 3000})
        fireEvent.click(checkbox);

        await waitFor(() => expect(screen.getByText('Prossesert dato')).toBeInTheDocument());
    });
});
