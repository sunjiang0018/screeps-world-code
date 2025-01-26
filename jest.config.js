import { pathsToModuleNameMapper } from "ts-jest";
import tsconfig from "./tsconfig.json" assert { type: "json" };

const { compilerOptions } = tsconfig;

export default {
  preset: "ts-jest",
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: "<rootDir>/" }),
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
