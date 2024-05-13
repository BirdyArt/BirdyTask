import OpenAPIClientAxios from "openapi-client-axios";
import { Client } from "../types/openapi";
export const api = new OpenAPIClientAxios({
  definition: import.meta.env.VITE_SWAGGER_URL,
  withServer: {
    url: import.meta.env.VITE_BASE_URL,
    description: "BirdyTask API",
  },
});

export const client = await api.init<Client>();
