export interface LoginTestCase {
  id: number;
  description: string;
  username: string;
  password: string;
  expectError: boolean;
  expectedErrorMessage?: string;
  requiredMessages?: {
    username?: string;
    password?: string;
  };
  skip?: boolean;
}

export const loginTestCases: LoginTestCase[] = [
  {
    id: 1,
    description: "Login successfully with valid username and password",
    username: process.env.USERNAME!,
    password: process.env.PASSWORD!,
    expectError: false,
  },
  {
    id: 2,
    description: "Login with trailing spaces at end of username",
    username: `${process.env.USERNAME!}   `,
    password: process.env.PASSWORD!,
    expectError: false,
  },
  {
    id: 3,
    description: "Login with mixed‑case username",
    username: process.env
      .USERNAME!.split("")
      .map((c, i) => (i % 2 ? c.toLowerCase() : c.toUpperCase()))
      .join(""),
    password: process.env.PASSWORD!,
    expectError: false,
  },
  {
    id: 4,
    description: "Password case‑sensitivity (wrong‑case password fails)",
    username: process.env.USERNAME!,
    password: process.env
      .PASSWORD!.split("")
      .map((c, i) => (i % 2 ? c.toLowerCase() : c.toUpperCase()))
      .join(""),
    expectError: true,
    expectedErrorMessage: "Invalid credentials",
  },
  {
    id: 5,
    description: "Valid username + invalid password fails",
    username: process.env.USERNAME!,
    password: "invalid123",
    expectError: true,
    expectedErrorMessage: "Invalid credentials",
  },
  {
    id: 6,
    description: "Invalid username + valid password fails",
    username: "invalidUser",
    password: process.env.PASSWORD!,
    expectError: true,
    expectedErrorMessage: "Invalid credentials",
  },
  {
    id: 7,
    description: "Invalid username + invalid password fails",
    username: "invalidUser",
    password: "invalid123",
    expectError: true,
    expectedErrorMessage: "Invalid credentials",
  },
  {
    id: 8,
    description: "Empty username and password show required errors",
    username: "",
    password: "",
    expectError: true,
    requiredMessages: {
      username: "Required",
      password: "Required",
    },
  },
  {
    id: 9,
    description: "Empty username only shows username required error",
    username: "",
    password: process.env.PASSWORD!,
    expectError: true,
    requiredMessages: {
      username: "Required",
    },
  },
  {
    id: 10,
    description: "Empty password only shows password required error",
    username: process.env.USERNAME!,
    password: "",
    expectError: true,
    requiredMessages: {
      password: "Required",
    },
  },
  {
    id: 11,
    description: "Disabled user cannot login",
    username: process.env.DISABLED_USERNAME!,
    password: process.env.DISABLED_PASSWORD!,
    expectError: true,
    expectedErrorMessage: "Invalid credentials",
  },
  {
    id: 12,
    description: "Login with new password after resetting",
    username: process.env.USERNAME!,
    password: process.env.NEW_PASSWORD!,
    expectError: false,
  },
  {
    id: 13,
    description: "Login with special characters fails",
    username: "^#*%$",
    password: "^#*%$",
    expectError: true,
    expectedErrorMessage: "Invalid credentials",
  },
];
