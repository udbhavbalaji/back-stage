import path from "path";
import fs from "fs";
import { Chalk } from "chalk";

const chalk = new Chalk();

import {
  ensureDirExists,
  findProjectRoot,
  getFormattedDate,
  getTimestamp,
} from "./internals";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LoggerOptions {
  level: LogLevel;
  context?: string;
  withTime: boolean;
  logDirName: string;
}

const defaultOptions: LoggerOptions = {
  level: "info",
  withTime: true,
  logDirName: "debug_logs",
};

class Logify {
  private level: LogLevel;
  private context?: string;
  private withTime: boolean;
  private logDir: string;

  constructor(options?: Partial<LoggerOptions>) {
    const mergedOptions = { ...defaultOptions, ...options };

    this.level = mergedOptions.level;
    this.context = mergedOptions.context;
    this.withTime = mergedOptions.withTime;

    this.logDir = path.join(findProjectRoot(), mergedOptions.logDirName);
  }

  private logToConsole(level: LogLevel, message: string, ...args: any[]) {
    if (this.shouldLog(level)) {
      const timestamp = this.withTime
        ? `[${getFormattedDate()} ${getTimestamp()}] `
        : "";
      const context = this.context ? `<ctx: ${this.context}>` : "";
      const logLevel = `[${level.toUpperCase()}] `;

      const formattedMessage = timestamp + logLevel + context + message;

      switch (level) {
        case "debug": {
          console.log(chalk.blue(formattedMessage, ...args));
          break;
        }
        case "info": {
          console.log(chalk.green(formattedMessage, ...args));
          break;
        }
        case "warn": {
          console.log(chalk.yellow(formattedMessage, ...args));
          break;
        }
        default: {
          console.log(chalk.red(formattedMessage, ...args));
          break;
        }
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levelValues: { [key in LogLevel]: number } = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };

    return levelValues[level] >= levelValues[this.level];
  }

  private logToFile(level: LogLevel, message: string) {
    if (this.shouldLog(level)) {
      ensureDirExists(this.logDir);
      const logDirWithLevel = path.join(this.logDir, level);
      ensureDirExists(logDirWithLevel);
      const logFilePath = path.join(
        logDirWithLevel,
        `${getFormattedDate("")}.log`,
      );

      const timestamp = this.withTime ? `[${getTimestamp()}] ` : "";
      const context = this.context ? `<ctx: ${this.context}>` : "";
      const logLevel = `[${level}] `;

      const logMessage = timestamp + logLevel + context + message;

      fs.appendFileSync(logFilePath, logMessage);
    }
  }

  debug(message: string, ...args: any[]) {
    this.logToConsole("debug", message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.logToConsole("info", message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.logToConsole("warn", message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.logToConsole("error", message, ...args);
  }

  setLevel(level: LogLevel) {
    this.level = level;
  }

  debugToFile(message: string) {
    this.logToFile("debug", message);
  }

  infoToFile(message: string) {
    this.logToFile("info", message);
  }

  warnToFile(message: string) {
    this.logToFile("warn", message);
  }

  errorToFile(message: string) {
    this.logToFile("error", message);
  }
}

export default Logify;
