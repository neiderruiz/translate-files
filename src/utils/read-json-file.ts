import fs from 'fs';

export const readJsonFile = (filePath: string) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');  // Lee el archivo JSON
        const jsonContent = JSON.parse(data);  // Parse JSON content
        return jsonContent;
    } catch (error) {
        console.error(`Error reading JSON file: ${error}`);
        return null;
    }
}