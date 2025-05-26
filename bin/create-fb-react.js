#!/usr/bin/env node

import { program } from "commander";
import { VERSION } from "../lib/constants.js";
import { checkNodeVersion } from "../lib/validators.js";
import { handleProjectCreation } from "../lib/project.js";
import { printHeader, printVersionInfo } from "../lib/ui.js";

checkNodeVersion();

program
  .version(VERSION)
  .description("Create a new React Firebase application")
  .argument("[project-name]", "name of the project")
  .option("-t, --template <template>", "template to use", "default")
  .action(async (projectName) => {
    printHeader();
    await handleProjectCreation(projectName);
  });

program
  .command("version")
  .description("Show version information")
  .action(() => {
    printVersionInfo();
  });

program.parse();
