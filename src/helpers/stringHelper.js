export const capitallize = (string, allWords = false) => {
  const stringList = string.split(' ');
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
    .join(' ');
};
