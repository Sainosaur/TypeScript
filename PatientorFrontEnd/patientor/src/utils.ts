

export const assertNever = (value: never) => {
    console.log(value);
    throw new Error(`Illegal; value above does not match any of the types. Please check the value and the type checking.`);
};