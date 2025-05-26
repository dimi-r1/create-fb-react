import chalk from "chalk";
import { resolveProjectPath, cleanupDirectory } from "./utils.js";
import { checkDirectoryExists } from "./validators.js";
import { printSuccessMessage, printError } from "./ui.js";
import { MESSAGES } from "./constants.js";
import {
  cloneTemplate,
  cleanGitHistory,
  updatePackageJson,
  setupEnvironment,
  installDependencies,
  initializeGit,
} from "./commands.js";

/**
 * Main project creation logic
 */

/**
 * Create a new React Firebase project
 * @param {string} projectName - Name of the project to create
 * @throws {SystemExit} Exits on error after cleanup
 */
export async function createProject(projectName) {
  const projectPath = resolveProjectPath(projectName);

  // Validate project setup
  checkDirectoryExists(projectPath, projectName);

  try {
    // Execute project creation steps
    await cloneTemplate(projectPath);
    await cleanGitHistory(projectPath);
    await updatePackageJson(projectPath, projectName);
    await setupEnvironment(projectPath);
    await installDependencies(projectPath);
    await initializeGit(projectPath);

    // Show success message
    printSuccessMessage(projectName);
  } catch (error) {
    // Handle errors with cleanup
    printError(error);
    cleanupDirectory(projectPath, console.log);
    process.exit(1);
  }
}

/**
 * Handle project creation with name prompt if needed
 * @param {string|undefined} projectName - Optional project name
 */
export async function handleProjectCreation(projectName) {
  // Import here to avoid circular dependency issues
  const { promptForProjectName } = await import("./ui.js");

  // Get project name if not provided
  if (!projectName) {
    projectName = await promptForProjectName();
  }

  await createProject(projectName);
}
