import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { execCommand } from "./utils.js";
import { TEMPLATE_REPO, SPINNERS } from "./constants.js";

/**
 * Command execution functions for project setup
 */

/**
 * Clone the template repository
 * @param {string} projectPath - Path where to clone the template
 * @throws {Error} - If cloning fails
 */
export async function cloneTemplate(projectPath) {
  const spinner = ora(SPINNERS.CLONING).start();
  try {
    await execCommand(`git clone ${TEMPLATE_REPO} ${projectPath}`);
    spinner.succeed(SPINNERS.CLONING_SUCCESS);
  } catch (error) {
    spinner.fail(SPINNERS.CLONING_FAIL);
    throw error;
  }
}

/**
 * Remove git history from cloned template
 * @param {string} projectPath - Path to the project
 * @throws {Error} - If cleaning fails
 */
export async function cleanGitHistory(projectPath) {
  const spinner = ora(SPINNERS.CLEANING).start();
  try {
    fs.removeSync(path.join(projectPath, ".git"));
    spinner.succeed(SPINNERS.CLEANING_SUCCESS);
  } catch (error) {
    spinner.fail(SPINNERS.CLEANING_FAIL);
    throw error;
  }
}

/**
 * Update package.json with new project name
 * @param {string} projectPath - Path to the project
 * @param {string} projectName - New project name
 * @throws {Error} - If update fails
 */
export async function updatePackageJson(projectPath, projectName) {
  const spinner = ora(SPINNERS.UPDATING).start();
  try {
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = fs.readJsonSync(packageJsonPath);
    packageJson.name = projectName;
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
    spinner.succeed(SPINNERS.UPDATING_SUCCESS);
  } catch (error) {
    spinner.fail(SPINNERS.UPDATING_FAIL);
    throw error;
  }
}

/**
 * Set up environment configuration by copying .env.example to .env.local
 * @param {string} projectPath - Path to the project
 * @throws {Error} - If setup fails
 */
export async function setupEnvironment(projectPath) {
  const spinner = ora(SPINNERS.ENV_SETUP).start();
  try {
    const envExamplePath = path.join(projectPath, ".env.example");
    const envLocalPath = path.join(projectPath, ".env.local");

    // Check if .env.example exists before copying
    if (fs.existsSync(envExamplePath)) {
      fs.copySync(envExamplePath, envLocalPath);
      spinner.succeed(SPINNERS.ENV_SETUP_SUCCESS);
    } else {
      // If .env.example doesn't exist, just succeed silently
      spinner.succeed("Environment setup skipped (no .env.example found)");
    }
  } catch (error) {
    spinner.fail(SPINNERS.ENV_SETUP_FAIL);
    throw error;
  }
}

/**
 * Install project dependencies using npm
 * @param {string} projectPath - Path to the project
 * @throws {Error} - If installation fails
 */
export async function installDependencies(projectPath) {
  const spinner = ora(SPINNERS.INSTALLING).start();
  try {
    await execCommand("npm install", { cwd: projectPath });
    spinner.succeed(SPINNERS.INSTALLING_SUCCESS);
  } catch (error) {
    spinner.fail(SPINNERS.INSTALLING_FAIL);
    throw error;
  }
}

/**
 * Initialize git repository with initial commit
 * @param {string} projectPath - Path to the project
 * @throws {Error} - If git initialization fails
 */
export async function initializeGit(projectPath) {
  const spinner = ora(SPINNERS.INITIALIZING).start();
  try {
    await execCommand("git init", { cwd: projectPath });
    await execCommand("git add .", { cwd: projectPath });
    await execCommand('git commit -m "Initial commit from create-blaze-app"', {
      cwd: projectPath,
    });
    spinner.succeed(SPINNERS.INITIALIZING_SUCCESS);
  } catch (error) {
    spinner.fail(SPINNERS.INITIALIZING_FAIL);
    throw error;
  }
}
