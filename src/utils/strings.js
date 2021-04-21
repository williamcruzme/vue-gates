export const startCase = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const pregQuote = (str) => {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
};

export const match = (str, wildcard) => {
  const regex = new RegExp('^' + wildcard.split(/\*+/).map(pregQuote).join('.*') + '$', 'g');
  return str.match(regex);
};
