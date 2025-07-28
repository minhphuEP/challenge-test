export interface SearchTestCase {
  id: number;
  description: string;
  criteria: {
    username?: string;
    userRole?: string;
    employeeName?: string;
    status?: string;
  };
  validations: {
    rowCountGreaterThanZero?: boolean;
    firstCellTextEquals?: string;
    invalidText?: string;
    noRecordsFound?: boolean;
    showErrorState?: boolean;
    showSearchingIndicator?: boolean;
    resetFields?: boolean;
    caseInsensitiveCompare?: boolean;
  };
}

export const searchTestCases: SearchTestCase[] = [
  {
    id: 1,
    description:
      "Verify that admin can search user without any search condition",
    criteria: {},
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 2,
    description: "Verify that admin can search user by Username - exact match",
    criteria: { username: "Admin" },
    validations: { firstCellTextEquals: "Admin" },
  },
  {
    id: 3,
    description:
      "Verify that admin can search user by Username - partial match",
    criteria: { username: "Adm" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 4,
    description: "Verify that admin can search user by User role - Admin",
    criteria: { userRole: "Admin" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 5,
    description: "Verify that admin can search user by User role - ESS",
    criteria: { userRole: "ESS" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 6,
    description: "Verify that admin can search user by Employee name",
    criteria: { employeeName: "Peter Mac Anderson" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 7,
    description: "Verify that admin can search user by Status - Enabled",
    criteria: { status: "Enabled" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 8,
    description: "Verify that admin can search user by Status - Disabled",
    criteria: { status: "Disabled" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 9,
    description: "Verify that admin can search user by all search conditions",
    criteria: {
      username: "Admin",
      userRole: "Admin",
      employeeName: "Peter Mac Anderson",
      status: "Enabled",
    },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 10,
    description: "Verify that admin can search user by Username and User role",
    criteria: { username: "Admin", userRole: "Admin" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 11,
    description:
      "Verify that admin can search user by Username and Employee name",
    criteria: { username: "Admin", employeeName: "Peter Mac Anderson" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 12,
    description: "Verify that admin can search user by Username and Status",
    criteria: { username: "Admin", status: "Enabled" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 13,
    description:
      "Verify that admin can search user by User role and Employee name",
    criteria: { userRole: "Admin", employeeName: "Peter Mac Anderson" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 14,
    description: "Verify that admin can search user by User role and Status",
    criteria: { userRole: "Admin", status: "Enabled" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 15,
    description:
      "Verify that admin can search user by Employee name and Status",
    criteria: { employeeName: "Peter Mac Anderson", status: "Enabled" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 16,
    description:
      "Verify that admin can search user by Username, User role and Employee name",
    criteria: {
      username: "Admin",
      userRole: "Admin",
      employeeName: "Peter Mac Anderson",
    },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 17,
    description:
      "Verify that admin can search user by Username, User role and Status",
    criteria: { username: "Admin", userRole: "Admin", status: "Enabled" },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 18,
    description:
      "Verify that admin can search user by Username, Employee name and Status",
    criteria: {
      username: "Admin",
      employeeName: "Peter Mac Anderson",
      status: "Enabled",
    },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 19,
    description:
      "Verify that admin can search user by User role, Employee name and Status",
    criteria: {
      userRole: "Admin",
      employeeName: "Peter Mac Anderson",
      status: "Enabled",
    },
    validations: { rowCountGreaterThanZero: true },
  },
  {
    id: 20,
    description: "Verify no result when searching by a non-existent Username",
    criteria: { username: "NonExistUserXYZ" },
    validations: { noRecordsFound: true },
  },
  {
    id: 21,
    description:
      "Verify no result when searching by a non-existent Employee name",
    criteria: { employeeName: "NonExistEmpXYZ" },
    validations: { noRecordsFound: true },
  },
  {
    id: 22,
    description:
      "Verify no result when searching by all search conditions matching no user",
    criteria: {
      username: "NonExistUserXYZ",
      userRole: "ESS",
      employeeName: "NonExistEmpXYZ",
      status: "Disabled",
    },
    validations: { noRecordsFound: true },
  },
  {
    id: 23,
    description: "Verify that admin can reset search",
    criteria: {
      username: "Admin",
      userRole: "Admin",
      employeeName: "Peter Mac Anderson",
      status: "Enabled",
    },
    validations: { resetFields: true },
  },
  {
    id: 24,
    description:
      "Verify no result when search by Username with special characters",
    criteria: { username: "*%$^" },
    validations: { noRecordsFound: true },
  },
  {
    id: 25,
    description:
      "Verify no result when search by Employee name with special characters",
    criteria: { employeeName: "*%$^" },
    validations: { noRecordsFound: true },
  },
  {
    id: 26,
    description: "Verify Username field is not case-sensitive",
    criteria: { username: "admin" },
    validations: { caseInsensitiveCompare: true },
  },
  {
    id: 27,
    description:
      "Verify that user can search by Username with space in the end of username",
    criteria: { username: "Admin   " },
    validations: { rowCountGreaterThanZero: true },
  },
];
