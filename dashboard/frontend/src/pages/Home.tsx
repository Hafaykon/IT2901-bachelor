import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import {orgAtom} from "../globalVariables/variables";
import {useRecoilValue} from "recoil";
import OrganizationSelector from "../components/OrganizationSelector";
function Home() {
    const org = useRecoilValue(orgAtom)



    return (
        <>
            {!org ? <OrganizationSelector/> : <Dashboard/>}
        </>

    );
}

export default Home;