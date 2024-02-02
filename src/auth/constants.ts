import { randomBytes } from "crypto";
const secret = randomBytes(32).toString("hex");

export const jwtConstants = {
  access: "ACCESS_TOKEN_KEY",
  refresh: "REFRESH_TOKEN_KEY",
};
