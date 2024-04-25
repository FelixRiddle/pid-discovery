import fs from "fs";
import path from "path";

/**
 * Update app information on the database
 */
export default function updateAppInfo(): void {
    const raw = fs.readFileSync(path.join(__dirname, "../", "package.json"));
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
    
    fetch(`${url}/process`, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    });
}
