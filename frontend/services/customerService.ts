import axios from "axios";

export async function getAllCustomers(token: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}