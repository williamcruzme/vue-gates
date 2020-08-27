export const startCase = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const pregQuote = (str, delimiter) => {
  const regex = new RegExp(`[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\${delimiter || ''}-]`, 'g');
  return (`${str}`).replace(regex, '\\$&');
};

export const match = (str, wildcard) => {
  const regex = new RegExp(pregQuote(wildcard).replace(/\\\*/g, '.*').replace(/\\\?/g, '.'), 'g');
  return str.match(regex);
};
