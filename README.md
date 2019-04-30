# json-standard

> Standard-inspired, CI/CD-friendly json linter and formatter

Checking and formatting JSON is easy with `JSON.parse` and `JSON.stringify`.
This project helps enforcing consistently formatted JSON in your projects
by providing the same api as js linters like eslint or standard.

## Usage

- Add to your project as a dev dependency:
  `npm install --save-dev json-standard`
- Check your json files:
  `npx json-standard`
- Fix your json files:
  `npx json-standard --fix`

## Selecting Files
You can provide a list of files or glob patterns as arguments to json-standard.
If no argument is provided, json-standard runs on `**/*.json`.
Files matching `node_modules/**` will always be ignored.
Some examples:
- `npx json-standard package.json`
- `npx json-standard 'data/**json'`

Don't forget to escape glob patterns if you want to pass them to json-standard
to stop your console from expanding them into a file list.

## CI/CD
Add json linting to your lint step. Your `package.json` might look like this:
```
{
  "scripts": {
    "lint:json": "json-standard *json",
    "lint:js": "standard",
    "lint": "lint:js && lint:json"
  }
}
```

## Configuration
You can configure the third argument to `JSON.stringify()` (the number of spaces or the string used as space) by putting it into your package.json like so:

```
{
  "json-standard": {
    "space": 2
  }
}
```
The default value for `space` is `2`. Use the standard.

