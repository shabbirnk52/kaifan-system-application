const jsonData = require('../../translation/source/source.json');

module.exports = function(content, lang) {
  const translation = jsonData.find(item => item.En === content);
  
  if (translation) {
    return lang === 'Ar' ? translation.Ar : translation.En;
  }
  
  return content;
};
