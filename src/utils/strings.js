export const startCase = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const isEmpty = (obj) => Object.keys(obj).length === 0;
