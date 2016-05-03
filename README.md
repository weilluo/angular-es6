## Angular & ES6/7 & Grunt

## Usage

- make sure you had installed `node`, `ruby`, `bower`, `grunt`.

- cd `root-folder`, then `npm install && bower install && bundle install`.

- to develop, cd `root-folder`, then `grunt server`.

- acceptance test

```bash
node_modules/protractor/bin/webdriver-manager start
node_modules/protractor/bin/protractor

# update webdriver-manager
node_modules/protractor/bin/webdriver-manager update --standalone
```

- unit test (services)

```bash
npm install -g karma-cli
node_modules/karma/bin/karma start
```
