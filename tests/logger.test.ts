import {
  describe,
  it,
  expect,
  expectTypeOf,
  vi,
  beforeEach,
  afterEach,
} from "vitest";
import Logger from "../src";
import Logify, { type LogLevel, type LoggerOptions } from "../src/logger";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

const originalConsole = { ...console };

// vi.mock("fs", () => ({
//   existsSync: vi.fn(),
//   mkdirSync: vi.fn(),
//   appendFileSync: vi.fn(),
// }));

vi.mock(import("fs"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
    appendFileSync: vi.fn(),
  };
});

type LogifyWithPrivateMethods = Logify & {
  logToConsole: (level: LogLevel, message: string, ...args: any[]) => void;
  shouldLog: (level: LogLevel) => boolean;
  logToFile: (level: LogLevel, message: string) => void;
};

beforeEach(() => {
  console.log = vi.fn();
});

afterEach(() => {
  console.log = originalConsole.log;

  vi.clearAllMocks();
});

describe("Logify Instantiation", () => {
  it("should create a new instance with the default options", () => {
    const logger = new Logify();

    expect(logger).toBeDefined();
    expect((logger as any).context).not.toBeDefined();
    expect((logger as any).level).toBe("info");
    expect((logger as any).withTime).toBe(true);
    expect((logger as any).logDir).toBe(path.join(process.cwd(), "debug_logs"));
  });

  it("should create a new instance with modified options", () => {
    const options: LoggerOptions = {
      level: "debug",
      withTime: false,
      logDirName: "custom_logs",
      context: "custom_context",
    };
    const logger = new Logify(options);

    expect(logger).toBeDefined();
    expect((logger as any).context).toBe("custom_context");
    expect((logger as any).level).toBe("debug");
    expect((logger as any).withTime).toBe(false);
    expect((logger as any).logDir).toBe(
      path.join(process.cwd(), "custom_logs"),
    );
  });
});

describe("Private methods", () => {
  describe("Log to Console", () => {
    it("should log", () => { });
  });
});
