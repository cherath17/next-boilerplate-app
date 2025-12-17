export interface UserData {
  id?: string;
  role?: number;
  email?: string;
  fullName?: string;
  region?: string;
  token?: string;
  storeIds?: {
    currencyCode?: string;
    domain?: string;
    id?: string;
    name?: string;
  }[];
}
