import { axios } from "./axios";

const ENDPOINT = "/users";

export async function getLoggedInUserInfo() {
  const { data }: { data: { access_token: string } } = await axios.get(
    ENDPOINT + "/me"
  );
  return data;
}
