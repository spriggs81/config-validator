// only dependency needed
import 'dotenv/config'; 

/**
 * Loads environment variables and ensures all required keys are present and non-empty.
 *
 * @param {string[]} requiredKeys - An array of environment variable names that must be present.
 * @returns {object} - An object containing only the required and validated environment variables.
 * @throws {Error} - Throws a detailed error if any required variable is missing or empty.
 */
export const loadAndValidateConfig = (requiredKeys) => {
    // We removed the redundant and error-causing 'dotenv.config();' line here.

    const missingVariables = [];
    const validatedConfig = {};

    // 2. Validate and build the output object
    for (const key of requiredKeys) {
        // Access process.env directly, knowing the import has already loaded the data.
        const value = process.env[key]; 

        // Check if the variable is missing or only contains whitespace
        if (!value || value.trim() === '') {
            missingVariables.push(key);
        } else {
            // Store the validated key/value pair for the final output object
            validatedConfig[key] = value.trim();
        }
    }

    // 3. Fail Fast: Report all missing variables in a single error
    if (missingVariables.length > 0) {
        const errorList = missingVariables.join(', ');
        throw new Error(
            `\n--- FATAL CONFIGURATION ERROR ---\n` +
            `The following essential environment variables are missing or empty: \n` +
            `[ ${errorList} ]\n` +
            `Please update your .env file and try again.`
        );
    }

    // 4. Success: Return the clean, validated configuration object
    return validatedConfig;
};