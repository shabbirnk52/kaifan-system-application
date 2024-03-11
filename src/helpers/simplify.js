module.exports = function(inputString) {
  // Remove special characters and spaces
  const formattedString = inputString.replace(/[^a-zA-Z0-9]/g, '').replace(/\s+/g, '');

  // Convert to camel case
  const camelCaseString = formattedString.replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) => {
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });

  return camelCaseString;
};
