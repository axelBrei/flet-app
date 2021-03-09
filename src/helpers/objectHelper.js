const snakeToCamelCase = (str) =>
  str.includes('_')
    ? str.replace(/_[a-zA-Z]{1}/g, (letter) => letter[1].toUpperCase())
    : str;

const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const keysToCamelCase = (object) =>
  Object.keys(object).reduce((acc, key) => {
    const isObject = object[key] && typeof object[key] === 'object';
    return {
      ...acc,
      [snakeToCamelCase(key)]: isObject
        ? keysToCamelCase(object[key])
        : object[key],
    };
  }, {});

export const keysToSnakeCase = (object) =>
  Object.keys(object).reduce((acc, key) => {
    const isObject = object[key] && typeof object[key] === 'object';
    return {
      ...acc,
      [camelToSnakeCase(key)]: isObject
        ? keysToSnakeCase(object[key])
        : object[key],
    };
  }, {});
