const path = require('path');
const pluralize = require('pluralize');
const finder = require('find-package-json');
const pjson = finder(process.cwd()).next().value;
let userPath;

module.exports = function (plop) {
  userPath = (pjson.svelte && pjson.svelte.basePath) || '';

  const userConfig = path.resolve(process.cwd(), userPath);
  const basePath = userConfig || process.cwd();

  plop.setPrompt('fuzzypath', require('inquirer-fuzzy-path'));

  const chooseDirAction = {
    type: 'fuzzypath',
    name: 'directory',
    itemType: 'directory',
    excludePath: nodePath => {
      const exclude = ['.vscode', 'node_modules'];
      return exclude.some(e => nodePath.includes(e));
    },
    message: 'Choose a directory..',
    rootPath: basePath
  };

  plop.setGenerator('Svelte', {
    prompts: [{
      type: 'input',
      name: 'c',
      message: 'Give me a name, please 😀'
    }],
    actions: function (data) {
      const {
        c
      } = data;

      const files = [{
        type: 'add',
        skipIfExists: true,
        path: buildPath(`${c}.svelte`, basePath),
        templateFile: `./templates/component.tpl`
      }];

      return files;
    }
  });

  plop.setHelper('switch', function (value, options) {
    this._switch_value_ = value;
    var html = options.fn(this);
    delete this._switch_value_;
    return html;
  });

  plop.setHelper('case', function (value, options) {
    if (value == this._switch_value_) {
      return options.fn(this);
    }
  });

  plop.setHelper('singular', function (value) {
    return pluralize.singular(value);
  });

  function buildPath(name, chosenDir) {
    return `${chosenDir}/${name}`;
  }
};
