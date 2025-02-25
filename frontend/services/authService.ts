import axios from "axios";

export async function login(email: string, password: string) {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
    email, password,
  });
}


