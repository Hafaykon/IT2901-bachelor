export interface LicensePoolData {
    application_name: string;
    organization: string;
    details: Array<{
        id: number;
        full_name: string;
        computer_name: string;
        email: string;
        last_used: string;
        total_minutes: number;
        active_minutes: number;
    }>;
}

export interface OwnOrgData {
    application_name: string;
    primary_user_full_name: string;
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


