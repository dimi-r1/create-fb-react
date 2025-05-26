#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);

if (majorVersion < 14) {
  console.log(chalk.red("❌ Node.js 14 or higher is required."));
  console.log(chalk.gray(`Current version: ${nodeVersion}`));
  console.log(chalk.gray("Please update Node.js: https://nodejs.org/"));
  process.exit(1);
}

const TEMPLATE_REPO =
  "https://github.com/dimi-r1/react-firebase-boilerplate.git";

program
  .version("1.0.0")
  .description("Create a new React Firebase application")
  .argument("[project-name]", "name of the project")
  .option("-t, --template <template>", "template to use", "default")
  .action(async (projectName, options) => {
    console.log(chalk.blue.bold("🚀 Create React Firebase App"));
    console.log();

    // Get project name if not provided
    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "What is your project name?",
          default: "my-react-firebase-app",
          validate: (input) => {
            if (input.trim() === "") {
              return "Project name cannot be empty";
            }
            if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
              return "Project name can only contain letters, numbers, hyphens, and underscores";
            }
            return true;
          },
        },
      ]);
      projectName = answers.projectName;
    }

    const projectPath = path.resolve(process.cwd(), projectName);

    // Check if directory already exists
    if (fs.existsSync(projectPath)) {
      console.log(chalk.red(`❌ Directory ${projectName} already exists!`));
      process.exit(1);
    }

    try {
      // Clone the template
      const cloneSpinner = ora("Cloning template...").start();
      execSync(`git clone ${TEMPLATE_REPO} ${projectPath}`, { stdio: "pipe" });
      cloneSpinner.succeed("Template cloned successfully");

      // Remove .git directory to start fresh
      const gitSpinner = ora("Cleaning up git history...").start();
      fs.removeSync(path.join(projectPath, ".git"));
      gitSpinner.succeed("Git history cleaned");

      // Update package.json
      const updateSpinner = ora("Updating project configuration...").start();
      const packageJsonPath = path.join(projectPath, "package.json");
      const packageJson = fs.readJsonSync(packageJsonPath);
      packageJson.name = projectName;
      fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
      updateSpinner.succeed("Project configuration updated");

      // Install dependencies
      const installSpinner = ora("Installing dependencies...").start();
      execSync("npm install", { cwd: projectPath, stdio: "pipe" });
      installSpinner.succeed("Dependencies installed");

      // Initialize git
      const gitInitSpinner = ora("Initializing git repository...").start();
      execSync("git init", { cwd: projectPath, stdio: "pipe" });
      execSync("git add .", { cwd: projectPath, stdio: "pipe" });
      execSync('git commit -m "Initial commit from create-fb-react"', {
        cwd: projectPath,
        stdio: "pipe",
      });
      gitInitSpinner.succeed("Git repository initialized");

      // Success message
      console.log();
      console.log(chalk.green.bold("✅ Project created successfully!"));
      console.log();
      console.log(chalk.cyan("Next steps:"));
      console.log(chalk.gray(`  cd ${projectName}`));
      console.log(chalk.gray("  cp .env.example .env.local"));
      console.log(
        chalk.gray("  # Configure your Firebase settings in .env.local")
      );
      console.log(chalk.gray("  npm run dev"));
      console.log();
      console.log(chalk.yellow("📚 Don't forget to:"));
      console.log(chalk.gray("  1. Set up your Firebase project"));
      console.log(chalk.gray("  2. Enable Google Authentication in Firebase"));
      console.log(chalk.gray("  3. Add your Firebase config to .env.local"));
      console.log();
      console.log(chalk.blue("Happy coding! 🎉"));
    } catch (error) {
      console.log();
      console.log(chalk.red("❌ Error creating project:"));
      console.log(chalk.red(error.message));

      // Clean up on error
      if (fs.existsSync(projectPath)) {
        try {
          fs.removeSync(projectPath);
          console.log(chalk.gray("Cleaned up incomplete project directory"));
        } catch (cleanupError) {
          console.log(
            chalk.yellow("Warning: Could not clean up project directory")
          );
        }
      }
      process.exit(1);
    }
  });

// Add a separate command to show version
program
  .command("version")
  .description("Show version information")
  .action(() => {
    console.log(chalk.blue.bold("🚀 Create React Firebase App"));
    console.log(chalk.gray("Version: 1.0.0"));
    console.log(
      chalk.gray(
        "Repository: https://github.com/dimi-r1/react-firebase-boilerplate"
      )
    );
    console.log(
      chalk.gray("CLI Repository: https://github.com/dimi-r1/create-fb-react")
    );
  });

program.parse();
