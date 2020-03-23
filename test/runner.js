const { execSync } = require("child_process");

const path = require('path');
const fs = require('fs');

const prependPathSegment = pathSegment => location => path.join(pathSegment, location);

const readdirPreserveRelativePath = location => fs.readdirSync(location).map(prependPathSegment(location));

const readdirRecursive = location => readdirPreserveRelativePath(location)
  .reduce((result, currentValue) => fs.statSync(currentValue).isDirectory()
    ? result.concat(readdirRecursive(currentValue))
    : result.concat(currentValue), [])
  .map((file) => file.replace("\\", "/"))
  .filter((file) => file.includes(".spec.js"));

const files = readdirRecursive("./test");

(async function() {
  for await (let file of files) {
    execSync("adonis test -f " + file, {stdio: 'inherit'});
  }
})();

