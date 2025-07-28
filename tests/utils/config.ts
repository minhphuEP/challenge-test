import * as dotenv from "dotenv";
dotenv.config({ override: true });

export const config = {
  username: process.env.USERNAME!,
  password: process.env.PASSWORD!,
  disabled_username: process.env.DISABLED_USERNAME!,
  disabled_password: process.env.DISABLED_PASSWORD!,
  new_password: process.env.NEW_PASSWORD!,
};
