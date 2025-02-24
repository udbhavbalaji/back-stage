import Logify from "./logger";
import { getFormattedJSON, getFormattedJSONTypes } from "./utils";

const logger = new Logify({ level: "debug" });

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

    const message = `[FnInspection] ${func.name} <${argTypes}> => ${finalResult} <${finalReturnType}>`;

    logger.debug(message);
  } catch (err) {
    logger.error((err as Error).message, (err as Error).stack);
  }
};

const inspectMethod = () => { };

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

    const message = `[FnInspection] ${func.name} <${argTypes}> => ${finalResult} <${finalReturnType}>`;

    logger.debug(message);
  } catch (err) {
    logger.error((err as Error).message, (err as Error).stack);
  }
};

const inspectMethodAsync = async () => { };

export { inspectMethodAsync, inspectMethod, inspectFnAsync, inspectFn };
