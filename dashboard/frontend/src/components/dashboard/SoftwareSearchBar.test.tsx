import { cleanup, getByTestId, render, screen, within } from '@testing-library/react';
import SoftwareSearchBar from './SoftwareSeachBar';
import '@testing-library/jest-dom/extend-expect';


describe("SearchField", () => {
    beforeEach(() => {
        render(
            <SoftwareSearchBar/>
        )
    })

    afterEach(() => {
        cleanup()
    })


    it("should have mutable inputs", () => {
        const autocomplete = getByTestId('autocomplete-search');
        expect(autocomplete).toBeInTheDocument();
    })
})





