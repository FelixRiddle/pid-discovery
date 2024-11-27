import fs from "fs";
import path from "path";

export type AppType = "application" | "backend" | "frontend" | "library";

export interface AppInfo {
	name: string;
	pid: number;
	appType: AppType,
	url: string;
}

/**
 * Get the app name from the closest package.json
 */
export function getAppName(): string {
	const packageJsonPath = path.resolve(process.cwd(), "package.json");
	try {
		// Find the closest package.json starting from the current working directory
		if (fs.existsSync(packageJsonPath)) {
			const packageJson = JSON.parse(
				fs.readFileSync(packageJsonPath, "utf-8")
			);
			return packageJson.name;
		}
	} catch (error) {
		console.error("Failed to fetch app name:", error);
	}

	throw new Error(`Failed to fetch app name from ${packageJsonPath}`);
}

/**
 * Create app info
 */
export function createAppInfo(appType: AppType, name: string = getAppName()) {
	// Fetch port and domain from environment variables
	const port = process.env.PORT;
	const domain = process.env.DOMAIN;

	// Build the URL dynamically
	let url: string;

	if (domain) {
		// If domain is provided, use it and append the port if it exists
		url = port ? `${domain}:${port}` : domain;
	} else {
		// Fallback to localhost if domain is not provided
		url = port ? `http://localhost:${port}` : "http://localhost";
	}

	const applicationInfo = {
		name,
		pid: process.pid,
		appType,
		url,
	};

	return applicationInfo;
}
