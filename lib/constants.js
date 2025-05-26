/**
 * Constants used throughout the CLI application
 */

export const TEMPLATE_REPO =
  "https://github.com/dimi-r1/react-firebase-boilerplate.git";
export const MIN_NODE_VERSION = 14;
export const VERSION = "1.0.0";
export const DEFAULT_PROJECT_NAME = "my-react-firebase-app";

export const MESSAGES = {
  NODE_VERSION_ERROR: `❌ Node.js ${MIN_NODE_VERSION} or higher is required.`,
  UPDATE_NODE: "Please update Node.js: https://nodejs.org/",
  DIRECTORY_EXISTS: "❌ Directory {name} already exists!",
  PROJECT_SUCCESS: "✅ Project created successfully!",
  HAPPY_CODING: "Happy coding! 🎉",
  ERROR_CREATING: "❌ Error creating project:",
};

export const SPINNERS = {
  CLONING: "Cloning template...",
  CLONING_SUCCESS: "Template cloned successfully",
  CLONING_FAIL: "Failed to clone template",

  CLEANING: "Cleaning up git history...",
  CLEANING_SUCCESS: "Git history cleaned",
  CLEANING_FAIL: "Failed to clean git history",

  UPDATING: "Updating project configuration...",
  UPDATING_SUCCESS: "Project configuration updated",
  UPDATING_FAIL: "Failed to update project configuration",

  ENV_SETUP: "Setting up environment configuration...",
  ENV_SETUP_SUCCESS: "Environment configuration created",
  ENV_SETUP_FAIL: "Failed to set up environment configuration",

  INSTALLING: "Installing dependencies...",
  INSTALLING_SUCCESS: "Dependencies installed",
  INSTALLING_FAIL: "Failed to install dependencies",

  INITIALIZING: "Initializing git repository...",
  INITIALIZING_SUCCESS: "Git repository initialized",
  INITIALIZING_FAIL: "Failed to initialize git repository",
};

export const REPOSITORIES = {
  BOILERPLATE: "https://github.com/dimi-r1/react-firebase-boilerplate",
  CLI: "https://github.com/dimi-r1/create-fb-react",
};
