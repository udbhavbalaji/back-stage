import Logify from "./logger";
import { getFormattedJSON, getFormattedJSONTypes } from "./utils";

export type MethodNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

const logger = new Logify({ level: "debug" });

// NOTE: No support for function types at this time
const getDetailedTypes = (
  result: any,
  args: any[],
): { finalReturnType: string; finalArgTypes: string } => {
  const finalArgTypes = args
    .map((arg) => {
      if (typeof arg === "object") {
        return getFormattedJSONTypes(arg);
      } else {
        return typeof arg;
      }
    })
    .join(", ");
  const returnType = typeof result;

  const finalReturnType =
    returnType === "object" ? getFormattedJSONTypes(result) : returnType;

  return { finalReturnType, finalArgTypes };
};

const inspectFnInDetail = <T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
) => {
  try {
    const result = func(...args);
    const returnType = typeof result;

    const finalResult =
      returnType === "object"
        ? getFormattedJSON(result)
        : returnType === "string"
          ? `"${result}"`
          : result;

    const { finalReturnType, finalArgTypes } = getDetailedTypes(result, args);

    const message = `[FnInspection] ${func.name} <${finalArgTypes}> => ${finalResult} <${finalReturnType}>`;

    logger.debug(message);
  } catch (err) {
    logger.error((err as Error).message, (err as Error).stack);
  }
};

const inspectFnInDetailAsync = async <T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
) => {
  try {
    const result = await func(...args);
    const returnType = typeof result;

    const finalResult =
      returnType === "object"
        ? getFormattedJSON(result)
        : returnType === "string"
          ? `"${result}"`
          : result;

    const { finalReturnType, finalArgTypes } = getDetailedTypes(result, args);

    const message = `[FnInspectionAsync] ${func.name} <${finalArgTypes}> => ${finalResult} <${finalReturnType}>`;

    logger.debug(message);
  } catch (err) {
    logger.error((err as Error).message, (err as Error).stack);
  }
};

const inspectFn = <T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
) => {
  try {
    const result = func(...args);
    const argTypes = args.map((arg) => typeof arg).join(", ");
    const returnType = typeof result;

    const finalResult =
      returnType === "object"
        ? getFormattedJSON(result)
        : returnType === "string"
          ? `"${result}"`
          : result;

    const message = `[FnInspection] ${func.name} <${argTypes}> => ${finalResult} <${returnType}>`;

    logger.debug(message);
  } catch (err) {
    logger.error((err as Error).message, (err as Error).stack);
  }
};

const inspectFnAsync = async <T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
) => {
  try {
    const result = await func(...args);
    const argTypes = args.map((arg) => typeof arg).join(", ");
    const returnType = typeof result;

    const finalResult =
      returnType === "object"
        ? getFormattedJSON(result)
        : returnType === "string"
          ? `"${result}"`
          : result;

    const message = `[FnInspectionAsync] ${func.name} <${argTypes}> => ${finalResult} <${returnType}>`;

    logger.debug(message);
  } catch (err) {
    logger.error((err as Error).message, (err as Error).stack);
  }
};

const inspectMethod = <T, K extends MethodNames<T>>(
  instance: T,
  method: K,
  ...args: T[K] extends (...args: infer P) => any ? P : never
) => {
  try {
    const result = (instance[method] as Function).apply(instance, args);

    const argTypes = args.map((arg) => typeof arg).join(", ");
    const returnType = typeof result;

    const finalResult =
      returnType === "object"
        ? getFormattedJSON(result)
        : returnType === "string"
          ? `"${result}"`
          : result;
    const finalReturnType =
      returnType === "object" ? getFormattedJSONTypes(result) : returnType;

    const message = `[MethodInspection] ${method as string} <${argTypes}> => ${finalResult} <${finalReturnType}>`;

    logger.debug(message);
  } catch (err) {
    logger.error((err as Error).message, (err as Error).stack);
  }
};

const inspectMethodInDetail = <T, K extends MethodNames<T>>(
  instance: T,
  method: K,
  ...args: T[K] extends (...args: infer P) => any ? P : never
) => {
  try {
    const result = (instance[method] as Function).apply(instance, args);
    const returnType = typeof result;

    const finalResult =
      returnType === "object"
        ? getFormattedJSON(result)
        : returnType === "string"
          ? `"${result}"`
          : result;

    const { finalReturnType, finalArgTypes } = getDetailedTypes(result, args);

    const message = `[MethodInspection] ${method as string} <${finalArgTypes}> => ${finalResult} <${finalReturnType}>`;

    logger.debug(message);
  } catch (err) {
    logger.error((err as Error).message, (err as Error).stack);
  }
};

const inspectMethodAsync = async <T, K extends MethodNames<T>>(
  instance: T,
  method: K,
  ...args: T[K] extends (...args: infer P) => any ? P : never
) => {
  try {
    const result = await (instance[method] as Function).apply(instance, args);

    const argTypes = args.map((arg) => typeof arg).join(", ");
    const returnType = typeof result;

    const finalResult =
      returnType === "object"
        ? getFormattedJSON(result)
        : returnType === "string"
          ? `"${result}"`
          : result;
    const finalReturnType =
      returnType === "object" ? getFormattedJSONTypes(result) : returnType;

    const message = `[MethodInspectionAsync] ${method as string} <${argTypes}> => ${finalResult} <${finalReturnType}>`;

    logger.debug(message);
  } catch (err) {
    logger.error((err as Error).message, (err as Error).stack);
  }
};

const inspectMethodInDetailAsync = async <T, K extends MethodNames<T>>(
  instance: T,
  method: K,
  ...args: T[K] extends (...args: infer P) => any ? P : never
) => {
  try {
    const result = await (instance[method] as Function).apply(instance, args);
    const returnType = typeof result;

    const finalResult =
      returnType === "object"
        ? getFormattedJSON(result)
        : returnType === "string"
          ? `"${result}"`
          : result;

    const { finalReturnType, finalArgTypes } = getDetailedTypes(result, args);

    const message = `[MethodInspectionAsync] ${method as string} <${finalArgTypes}> => ${finalResult} <${finalReturnType}>`;

    logger.debug(message);
  } catch (err) {
    logger.error((err as Error).message, (err as Error).stack);
  }
};

export {
  inspectFn,
  inspectFnAsync,
  inspectFnInDetail,
  inspectFnInDetailAsync,
  inspectMethod,
  inspectMethodAsync,
  inspectMethodInDetail,
  inspectMethodInDetailAsync,
};
