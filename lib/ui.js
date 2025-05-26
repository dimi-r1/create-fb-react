import chalk from "chalk";
import inquirer from "inquirer";
import {
  VERSION,
  REPOSITORIES,
  DEFAULT_PROJECT_NAME,
  MESSAGES,
} from "./constants.js";
import { validateProjectName } from "./validators.js";

/**
 * UI and display functions for the CLI application
 */

/**
 * Prompt user for project name with validation
 * @returns {Promise<string>} - The validated project name
 */
export async function promptForProjectName() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is your project name?",
      default: DEFAULT_PROJECT_NAME,
      validate: validateProjectName,
    },
  ]);
  return answers.projectName;
}

/**
 * Print success message with next steps
 * @param {string} projectName - Name of the created project
 */
export function printSuccessMessage(projectName) {
  const message = `
${chalk.green.bold(MESSAGES.PROJECT_SUCCESS)}

${chalk.cyan("Next steps:")}
${chalk.gray(`  cd ${projectName}`)}
${chalk.gray("  # Configure your Firebase settings in .env.local")}
${chalk.gray("  npm run dev")}

${chalk.yellow("📚 Don't forget to:")}
${chalk.gray("  1. Set up your Firebase project")}
${chalk.gray("  2. Enable Google Authentication in Firebase")}
${chalk.gray("  3. Add your Firebase config to .env.local")}

${chalk.blue(MESSAGES.HAPPY_CODING)}
`;
  console.log(message);
}

/**
 * Print version and repository information
 */
export function printVersionInfo() {
  const message = `${chalk.blue.bold("🔥 Create Blaze App")}
${chalk.gray(`Version: ${VERSION}`)}
${chalk.gray(`Repository: ${REPOSITORIES.BOILERPLATE}`)}
${chalk.gray(`CLI Repository: ${REPOSITORIES.CLI}`)}`;
  console.log(message);
}

/**
 * Print application header
 */
export function printHeader() {
  console.log(chalk.blue.bold("🔥 Create Blaze App"));
  console.log();
}

/**
 * Print error message with proper formatting
 * @param {Error} error - The error to display
 */
export function printError(error) {
  const message = `
${chalk.red(MESSAGES.ERROR_CREATING)}
${chalk.red(error.message)}`;
  console.log(message);
}
