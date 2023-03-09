export interface SoftwareUser {
  application_name: string;
  organization: string;
  details: Array<{
    id: number;
    full_name: string;
    computer_name: string;
    email: string;
    total_minutes: number;
    active_minutes: number;
  }>;
}

export interface UserData {
  id: number;
  active_minutes: number;
  email: string;
  organization: string;
  full_name: string;
  total_minutes: number;
}


