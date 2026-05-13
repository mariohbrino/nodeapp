class InvalidValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidValueError";
    Object.setPrototypeOf(this, InvalidValueError.prototype);
  }
}

/**
 * This util function validates if a string value contains a boolean value true or false.
 * @param value string | undefined value to validate
 * @param defaultValue boolean value to return if the string value is undefined (default: true)
 * @returns boolean value if the string is valid, otherwise throws an error
 * @throws InvalidValueError if the string value is not a valid boolean
 */
const validateBoolean = (value: string | undefined, defaultValue: boolean = true): boolean => {
  if (value === undefined) {
    return defaultValue; // Default to true if the value is not provided
  }

  if (["true", "1", "yes"].includes(value)) {
    console.log(value);
    return true;
  }

  if (["false", "0", "no"].includes(value)) {
    console.log(value);
    return false;
  }

  throw new InvalidValueError(`Invalid boolean value: ${value}`);
};

export { validateBoolean };
