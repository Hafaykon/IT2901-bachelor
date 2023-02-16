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

export default {
  fetchOrganizations,
  fetchSoftwareRecommendations,
  fetchSoftwareUsedInOrg,
  fetchSoftwareUsers

};