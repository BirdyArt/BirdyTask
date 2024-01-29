import { axios } from "./axios";

const ENDPOINT = "/auth";

export async function login({ email, password }: any) {
  const { data }: { data: { access_token: string } } = await axios.post(
    ENDPOINT + "/signin",
    {
      email,
      password,
    }
  );
  return data;
}

export async function signup({ firstName, lastName, email, password }: any) {
  const { data }: { data: { access_token: string } } = await axios.post(
    ENDPOINT + "/signup",
    {
      firstName,
      lastName,
      email,
      password,
    }
  );
  return data;
}
