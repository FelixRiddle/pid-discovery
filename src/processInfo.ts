import { Models } from "felixriddle.ts-app-models";
import fs from "fs";
import path from "path";
import { AppInfo } from "./appInfo";

/**
 * Update app information on the database
 */
export async function updateAppInfo() {
	// Get cwd
	const CWD = process.cwd();
	const raw = fs.readFileSync(path.join(CWD, "package.json"));
	const packageJson = JSON.parse(raw.toString());

	// Insert / Update process to the database
	const url = `http://localhost:24000`;
	const headers = {
		"Content-Type": "application/json",
	};
	const data = {
		name: packageJson.name,
		pid: process.pid,
		appType: "application",
		url: ``,
	};

	return await fetch(`${url}/process`, {
		method: "POST",
		headers,
		body: JSON.stringify(data),
	});
}

/**
 * More configurable option to insert process information
 */
export async function upsertProcessInfo(appInfo: AppInfo) {
	// Insert / Update process to the database
	const url = `http://localhost:24000`;
	const headers = {
		"Content-Type": "application/json",
	};
	const data = {
		name: appInfo.name,
		pid: appInfo.pid,
		appType: appInfo.appType,
		url: appInfo.url,
	};

	return await fetch(`${url}/process`, {
		method: "POST",
		headers,
		body: JSON.stringify(data),
	});
}

/**
 * Insert / Update process information with sequelize
 */
export async function upsertProcessInfoSequelize(
	models: Models,
	appInfo: AppInfo
) {
	const { Process } = models;

	// Insert / Update model
	return await Process.upsert({
		name: appInfo.name,
		pid: appInfo.pid,
		appType: appInfo.appType,
		url: appInfo.url,
	});
}
