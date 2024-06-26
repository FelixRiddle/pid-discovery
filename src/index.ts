import fs from "fs";
import path from "path";

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
        "Content-Type": "application/json"
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
        body: JSON.stringify(data)
    });
}

export interface AppInfo {
    name: string;
    pid: number;
    appType: string;
    url: string;
}

/**
 * More configurable option to insert process information
 */
export async function upsertProcessInfo(appInfo: AppInfo) {
    // Insert / Update process to the database
    const url = `http://localhost:24000`;
    const headers = {
        "Content-Type": "application/json"
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
        body: JSON.stringify(data)
    })
}
