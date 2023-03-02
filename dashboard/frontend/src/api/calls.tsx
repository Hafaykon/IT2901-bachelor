// This file contains all the API calls to the backend

/**
 * Fetches all distinct the organizations from the backend.
 * Data is returned as a JSON object:
 */
export const fetchOrganizations = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/organizations/');
        const data = await response.json();
        return [...data];
    } catch (error) {
        console.log(error);
    }
};

/***
 * Fetches all software within an organization that hasn't been used in 90 days from the backend.
 * @param organization - Optional parameter to filter the software recommendations by organization
 */
export const fetchSoftwareRecommendations = async (organization?: string) => {
    try {
        let url = 'http://127.0.0.1:8000/api/recommendations/';
        if (organization) {
            url = `${url}?organization=${organization}`;
        }
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
/***
 * Fetches all distinct software used within an organization from the backend.
 * @param organization - Optional parameter to filter on organization.
 */
export const fetchSoftwareUsedInOrg = async (organization?: string) => {
    try {
        let url = 'http://127.0.0.1:8000/api/software/';
        if (organization) {
            url = `${url}?organization=${organization}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return [...data];
    } catch (error) {
        console.log(error);
    }
};

/***
 * Fetches software used within an organization and its users.
 * @param organization  - Optional parameter to filter on organization.
 */
export const fetchSoftwareUsers = async (organization?: string) => {
    try {
        let url = 'http://127.0.0.1:8000/api/applications/';
        if (organization) {
            url = `${url}?organization=${organization}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return [...data];
    } catch (error) {
        console.log(error);
    }
};
/***
 * Fetches software used within an organization and its users.
 * @param software - Optional parameter to filter on software.
 * @param org - Optional parameter to filter on organization.
 */
export const fetchOrgSoftwareByName = async (software?: string, org?: string) => {
    try {
        let url = 'http://127.0.0.1:8000/api/softwarebyuser/';
        if (software && org) {
            url = `${url}?application_name=${software}&organization=${org}`;
        } else if (software) {
            url = `${url}?application_name=${software}`;
        } else if (org) {
            url = `${url}?organization=${org}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return [...data];
    } catch (error) {
        console.log(error);
    }
}

/***
 * Fetches software used by a specified user.
 * @param username - Non-optional parameter to specify user.
 */
export const fetchLicensesAssociatedWithUser = async (username: string) => {
    try {
        const url = 'http://127.0.0.1:8000/api/userlicenses/' + username;
        const response = await fetch(url);
        const data = await response.json();
        console.log(url);
        return [...data];
    } catch (error) {
        console.log(error);
    }
};
export const fetchInfoBoxData = async (org?: string) => {
    try {
        let url = 'http://127.0.0.1:8000/api/count';
        if (org) {
            url = `${url}?organization=${org}`;

        }
        const response = await fetch(url);
        const data = await response.json();
        return [data];
    } catch (error) {
        console.log(error);
    }
}





export default {
    fetchOrganizations,
    fetchSoftwareRecommendations,
    fetchSoftwareUsedInOrg,
    fetchSoftwareUsers,
    fetchLicensesAssociatedWithUser,
    fetchOrgSoftwareByName,
    fetchInfoBoxData

};