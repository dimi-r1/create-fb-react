import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

/**
 * Utility functions for the CLI application
 */

/**
 * Execute a shell command with error handling
 * @param {string} command - The command to execute
 * @param {object} options - Options to pass to execSync
 * @returns {Promise<Buffer>} - Command output
 * @throws {Error} - If command fails
 */
export async function execCommand(command, options = {}) {
  try {
    return execSync(command, { stdio: "pipe", ...options });
  } catch (error) {
    throw new Error(`Command failed: ${command}\n${error.message}`);
  }
}

/**
 * Parse Node.js version string to get major version number
 * @param {string} versionString - Node.js version string (e.g., "v16.14.0")
 * @returns {number} - Major version number
 */
export function parseNodeVersion(versionString) {
  return parseInt(versionString.slice(1).split(".")[0]);
}

/**
 * Clean up project directory on error
 * @param {string} projectPath - Path to the project directory
 * @param {Function} logger - Logging function (defaults to console.log)
 */
export function cleanupDirectory(projectPath, logger = console.log) {
  if (fs.existsSync(projectPath)) {
    try {
      fs.removeSync(projectPath);
      logger(chalk.gray("Cleaned up incomplete project directory"));
    } catch (cleanupError) {
      logger(chalk.yellow("Warning: Could not clean up project directory"));
    }
  }
}

/**
 * Resolve project path from current working directory
 * @param {string} projectName - Name of the project
 * @returns {string} - Absolute path to project directory
 */
export function resolveProjectPath(projectName) {
  return path.resolve(process.cwd(), projectName);
}
