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

  // const finalResult =
  //   returnType === "object"
  //     ? getFormattedJSON(result)
  //     : returnType === "string"
  //       ? `"${result}"`
  //       : result;
  const finalReturnType =
    returnType === "object" ? getFormattedJSONTypes(result) : returnType;

  return { finalReturnType, finalArgTypes };
};

const inspectFnFinal = (func: Function, ...args: any[]) => {
  let finalResult, finalReturnType, finalArgTypes;

  let getDetailedTypesFlag = false;

  if (
    args.length > 0 &&
    typeof args[args.length - 1] === "object" &&
    args[args.length - 1] !== null &&
    "detailed" in args[args.length - 1]
  ) {
    const detailedLevel = args.pop() as { detailed: boolean };
    getDetailedTypesFlag = detailedLevel.detailed;
  }

  try {
    const result = func(...args);
    // const argTypes = args.map((arg) => typeof arg).join(", ");
    const returnType = typeof result;

    finalResult =
      returnType === "object"
        ? getFormattedJSON(result)
        : returnType === "string"
          ? `"${result}"`
          : result;

    if (getDetailedTypesFlag) {
      // const { finalReturnType, finalArgTypes } = getDetailedTypes(result, args);
      const detailedTypes = getDetailedTypes(result, args);
      finalReturnType = detailedTypes.finalReturnType;
      finalArgTypes = detailedTypes.finalArgTypes;
    } else {
      finalReturnType = returnType;
      finalArgTypes = args.map((arg) => typeof arg).join(", ");
    }

    const message = `[FnInspection] ${func.name} <${finalArgTypes}> => ${finalResult} <${finalReturnType}>`;

    console.log(getDetailedTypesFlag);
    console.log(typeof result);
    logger.debug(message);
  } catch (err) {
    logger.error((err as Error).message, (err as Error).stack);
  }
};

const inspectFn = (func: Function, ...args: any[]) => {
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
    const finalReturnType =
      returnType === "object" ? getFormattedJSONTypes(result) : returnType;

    logger.info(finalReturnType);

    const message = `[FnInspection] ${func.name} <${argTypes}> => ${finalResult} <${finalReturnType}>`;

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

const inspectFnAsync = async (func: Function, ...args: any[]) => {
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
    const finalReturnType =
      returnType === "object" ? getFormattedJSONTypes(result) : returnType;

    const message = `[FnInspectionAsync] ${func.name} <${argTypes}> => ${finalResult} <${finalReturnType}>`;

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

export {
  inspectMethodAsync,
  inspectMethod,
  inspectFnAsync,
  inspectFn,
  inspectFnFinal,
};
