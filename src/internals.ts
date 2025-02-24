import path from "path";
import fs from "fs";

const findProjectRoot = (startDir: string = process.cwd()) => {
  let currentDir = startDir;

  while (currentDir !== path.parse(currentDir).root) {
    if (fs.existsSync(path.join(currentDir, "package.json"))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  throw new Error("Unable to find project root (np package.json found)");
};

const ensureDirExists = (dirName: string) => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
};

const getFormattedDate = (
  delimiter: string = "-",
  date: Date = new Date(),
): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${delimiter}${month}${delimiter}${day}`;
};

const getTimestamp = (date: Date = new Date()): string => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export { findProjectRoot, ensureDirExists, getFormattedDate, getTimestamp };
