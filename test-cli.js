#!/usr/bin/env node

/**
 * Test script for the create-fb-react CLI
 * This script tests various scenarios and validates the CLI functionality
 */

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs-extra";
import chalk from "chalk";

const execAsync = promisify(exec);

const TEST_PROJECT_NAME = "test-fb-react-app";
const CLI_PATH = "./bin/create-fb-react.js";

/**
 * Test helper functions
 */
function log(message, type = "info") {
  const colors = {
    info: chalk.blue,
    success: chalk.green,
    error: chalk.red,
    warning: chalk.yellow,
  };
  console.log(colors[type](`[${type.toUpperCase()}] ${message}`));
}

async function cleanup() {
  if (fs.existsSync(TEST_PROJECT_NAME)) {
    await fs.remove(TEST_PROJECT_NAME);
    log(`Cleaned up ${TEST_PROJECT_NAME}`, "info");
  }
}

async function testVersionCommand() {
  log("Testing version command...", "info");
  try {
    const { stdout } = await execAsync(`node ${CLI_PATH} version`);
    if (stdout.includes("Create React Firebase App")) {
      log("✅ Version command works", "success");
      return true;
    } else {
      log("❌ Version command output incorrect", "error");
      return false;
    }
  } catch (error) {
    log(`❌ Version command failed: ${error.message}`, "error");
    return false;
  }
}

async function testHelpCommand() {
  log("Testing help command...", "info");
  try {
    const { stdout } = await execAsync(`node ${CLI_PATH} --help`);
    if (stdout.includes("Create a new React Firebase application")) {
      log("✅ Help command works", "success");
      return true;
    } else {
      log("❌ Help command output incorrect", "error");
      return false;
    }
  } catch (error) {
    log(`❌ Help command failed: ${error.message}`, "error");
    return false;
  }
}

async function testDirectoryValidation() {
  log("Testing directory validation...", "info");

  // Create a test directory
  await fs.ensureDir(TEST_PROJECT_NAME);

  try {
    await execAsync(`echo "" | node ${CLI_PATH} ${TEST_PROJECT_NAME}`);
    log("❌ Should have failed for existing directory", "error");
    return false;
  } catch (error) {
    if (error.stdout && error.stdout.includes("already exists")) {
      log("✅ Directory validation works", "success");
      return true;
    } else {
      log(`❌ Unexpected error: ${error.message}`, "error");
      return false;
    }
  } finally {
    await cleanup();
  }
}

async function runTests() {
  log("Starting CLI tests...", "info");
  console.log();

  const tests = [
    { name: "Version Command", fn: testVersionCommand },
    { name: "Help Command", fn: testHelpCommand },
    { name: "Directory Validation", fn: testDirectoryValidation },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    log(`Running test: ${test.name}`, "info");
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      log(`Test ${test.name} threw an error: ${error.message}`, "error");
      failed++;
    }
    console.log();
  }

  // Summary
  log("Test Summary:", "info");
  log(`✅ Passed: ${passed}`, "success");
  if (failed > 0) {
    log(`❌ Failed: ${failed}`, "error");
  }

  if (failed === 0) {
    log("🎉 All tests passed!", "success");
    process.exit(0);
  } else {
    log("💥 Some tests failed!", "error");
    process.exit(1);
  }
}

// Cleanup on exit
process.on("exit", cleanup);
process.on("SIGINT", async () => {
  await cleanup();
  process.exit(0);
});

// Run tests
runTests().catch((error) => {
  log(`Test runner failed: ${error.message}`, "error");
  process.exit(1);
});
