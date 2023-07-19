module.exports = function (Handlebars) {
  Handlebars.registerHelper('checkTitle', function (title, options) {
    if (title === 'Unreleased') {
      return new Handlebars.SafeString(title);
    } else {
      return new Handlebars.SafeString('[' + title + ']');
    }
  });
};
