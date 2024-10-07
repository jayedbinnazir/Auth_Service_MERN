import type { Config } from "jest";

const config: Config = {
   verbose: true, // Output additional information during test runs
   preset: "ts-jest", // Use ts-jest to handle TypeScript files
   testEnvironment: "node", // Set up the test environment to simulate a Node.js environment
   roots: ["./"], // Only look for test files in the src folder
   moduleFileExtensions: ["ts", "js"], // Recognize both .ts and .js file extensions
   transform: {
      "^.+\\.ts$": "ts-jest", // Use ts-jest to transform .ts files
   },
   extensionsToTreatAsEsm: [".ts"], // Treat .ts files as ESM
   moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1", // Simplify import paths using @ alias
   },
   testMatch: [
      "**/auth_service/**/*.spec.ts",
      "**/auth_service/src/**/*.spec.ts",
   ],
   collectCoverage: true, // Enable coverage reporting
   collectCoverageFrom: ["auth_service/src/**/*.ts"], // Collect coverage data from .ts files
   coverageDirectory: "./auth_service/coverage", // Save coverage reports in the coverage folder
   coveragePathIgnorePatterns: ["/node_modules/", "./auth_service/dist/"], // Ignore node_modules and dist folders
};

export default config;
