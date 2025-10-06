# config-validator
A robust, single-package solution for Node.js that wraps dotenv to enforce mandatory validation of critical environment variables. Ensure your application fails fast and clearly if essential secrets are missing or empty.

## Why Use This?
In modern Node.js and Next.js applications, missing a single environment variable (like DATABASE_URL or a SECRET_KEY) can lead to cryptic errors or security vulnerabilities at runtime.

This module enforces Developer Discipline by loading your .env file and checking a list of required keys. If any key is missing or blank, the application is immediately shut down with a detailed, human-readable error report, preventing silent failures and deployment headaches.

## Installation
This module sub-depends on the official dotenv library.
```
npm install config-validator-js
```
## Quick Start (ESM Example)
### 1. Create a .env File
Place your sensitive variables in a .env file at the root of your project:
```
# .env
# This variable is required by your application
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
```
### 2. Define and Validate
In your main entry file (server.js or index.js), you define an array of variables that must be present.
```
// server.js or your application entry point

import { loadAndValidateConfig } from 'config-validator-js';

// --- Define the keys required for your application to run ---
const REQUIRED_KEYS = [
    'DATABASE_URL', 
    'SECRET_KEY',
    'SERVER_PORT'
];

// --- Load and Validate ---
// This function will throw a FATAL error if any key in the array is missing.
// If successful, it returns a clean object with only the validated keys.
const config = loadAndValidateConfig(REQUIRED_KEYS);


// 🚀 Application can now start safely!
const PORT = config.SERVER_PORT || 8080;

console.log(`Server running securely on port ${PORT}`);
console.log(`Database URL loaded: ${config.DATABASE_URL.substring(0, 20)}...`);
```
## Core Features
Single-Step Setup: Replaces complex environment validation boilerplate.

Zero Silent Failures: Application terminates immediately if a critical key is missing, saving hours of debugging time.

Clean Output: Returns a concise JavaScript object containing only the required keys, preventing unnecessary exposure of other environment variables.

ESM Ready: Fully designed for modern JavaScript projects using the import syntax.

## Validation Logic Example
The validator checks for three conditions on every required key:

Is the variable defined?

Is the value an empty string?

Does the value contain only whitespace (e.g., "   " or "")?

If any of these are true, the module throws the following detailed error, preventing application startup:
```
Error:
--- FATAL CONFIGURATION ERROR ---
The following essential environment variables are missing or empty:
[ DATABASE_URL, SECRET_KEY ]
Please update your .env file and try again.
```