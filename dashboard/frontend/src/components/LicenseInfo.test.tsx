import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import LicenseInfo from './LicenseInfo';

const mockOrgs = [[
    "Adobe Acrobat DC Professional",
]]

const mockData = [{
    "application_name": "Adobe Acrobat DC Professional",
    "primary_user_full_name": "Bertil Nedregård",
    "computer_name": "TK010027481557",
    "details": [
        {
            "id": 444282,
            "last_used": "2023-01-20"
        }
    ],
    "status": "Aktiv"
}]

jest.mock('../api/calls', () => ({
    fetchSoftwareUsedInOrg: jest.fn(() => Promise.resolve(mockOrgs)),
    fetchInfoBoxLicense: jest.fn(() => Promise.resolve(mockData)),

}));
jest.mock('@mui/material/Pagination', () => {
    const MockPagination = () => <div data-testid="mock-pagination"/>;
    MockPagination.displayName = 'Pagination';
    return MockPagination;
})


describe('LicenseInfo page', () => {


    beforeEach(() => {
        localStorage.setItem('organization', JSON.stringify('IT-tjenesten'));
    })

    afterEach(() => {
        localStorage.clear();
    })
    it('renders the total license page', async () => {
        render(
            <MemoryRouter initialEntries={['/Totale Lisenser']}>
                <Routes>
                    <Route path='/:title' element={<LicenseInfo/>}/>
                </Routes>
            </MemoryRouter>
        );
        expect(await screen.findByText('Totale Lisenser i IT-tjenesten')).toBeInTheDocument();
    });
    it('renders the unused license page', async () => {
        render(
            <MemoryRouter initialEntries={['/Ubrukte Lisenser']}>
                <Routes>
                    <Route path='/:title' element={<LicenseInfo/>}/>
                </Routes>
            </MemoryRouter>
        );


        expect(await screen.findByText('Ubrukte Lisenser i IT-tjenesten')).toBeInTheDocument();
    });
    it('renders the correct license data', async () => {
        render(
            <MemoryRouter initialEntries={['/Ledige Lisenser']}>
                <Routes>
                    <Route path='/:title' element={<LicenseInfo/>}/>
                </Routes>
            </MemoryRouter>
        );
        expect(await screen.findByText('Ledige Lisenser i IT-tjenesten')).toBeInTheDocument();
    });

});
