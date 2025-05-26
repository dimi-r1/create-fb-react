import chalk from "chalk";
import fs from "fs-extra";
import { MIN_NODE_VERSION, MESSAGES } from "./constants.js";
import { parseNodeVersion } from "./utils.js";

/**
 * Validation functions for the CLI application
 */

/**
 * Validates project name format
 * @param {string} input - Project name to validate
 * @returns {boolean|string} - true if valid, error message if invalid
 */
export function validateProjectName(input) {
  if (input.trim() === "") {
    return "Project name cannot be empty";
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
    return "Project name can only contain letters, numbers, hyphens, and underscores";
  }
  return true;
}

/**
 * Checks if the current Node.js version meets the minimum requirement
 * @throws {SystemExit} Exits the process if Node.js version is too old
 */
export function checkNodeVersion() {
  const nodeVersion = process.version;
  const majorVersion = parseNodeVersion(nodeVersion);

  if (majorVersion < MIN_NODE_VERSION) {
    console.log(chalk.red(MESSAGES.NODE_VERSION_ERROR));
    console.log(chalk.gray(`Current version: ${nodeVersion}`));
    console.log(chalk.gray(MESSAGES.UPDATE_NODE));
    process.exit(1);
  }
}

/**
 * Checks if directory already exists
 * @param {string} projectPath - Path to check
 * @param {string} projectName - Name of the project for error message
 * @throws {SystemExit} Exits if directory exists
 */
export function checkDirectoryExists(projectPath, projectName) {
  if (fs.existsSync(projectPath)) {
    const message = MESSAGES.DIRECTORY_EXISTS.replace("{name}", projectName);
    console.log(chalk.red(message));
    process.exit(1);
  }
}
