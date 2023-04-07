export interface LicensePoolData {
    application_name: string;
    organization: string;
    details: Array<{
        computer_name: string;
        email: string;
        family: string,
        family_edition: string,
        family_version: string,
        full_name: string,
        id: number;
        spc_id: number;
        last_used: string;
    }>;
}

export interface OwnOrgData {
    application_name: string;
    primary_user_full_name: string;
    primary_user_email: string;
    organization: string;
    computer_name: string;
    status: string;
    details: Array<{
        id: number;
        last_used: string;

    }>
}

export interface SoftwareData {
    id: number;
    application_name: string;
    computer_name: string;
    primary_user_full_name: string;
    primary_user_email: string;
    last_used: string;
    total_minutes: number;
    active_minutes: number;

}


export interface Count {
    total_licenses: number,
    active_licenses: number,
    never_used: number,
    unused_licenses: number,
    available_licenses: number,

}

export interface UserInformation {
    primary_user_email: string;
    organization: string;
    is_unit_head: boolean;
}

export interface OrgRequest {
    id: number; // The ID of the request
    contact_organization: string; // The name of the organization contacted
    application_name: string; // The name of the application being requested
    family: string | null; // The name of the family if applicable
    family_version: string | null; // The version of the family if applicable
    family_edition: string | null; // The edition of the family if applicable
    request: "add" | "remove" | "update"; // The type of request being made
    request_date: string; // The date the request was made
    approved: boolean; // Whether the request has been approved
    completed: boolean; // Whether the request has been completed
    reviewed_by: string | null; // The name of the reviewer if applicable
    reviewed_date: string | null; // The date the request was reviewed if applicable
    spc_id: number; // The SPC ID of the request
    requested_by: string; // The email of the person who requested the change
}