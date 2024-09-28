import { exec } from "child_process";
import fs from "fs/promises";
import _ from "lodash";
import path from "path";
import readdirp, { EntryInfo } from "readdirp";
import util from "util";
const execPromise = util.promisify(exec);

(async () => {
  const pages: string[] = [];
  const apies: string[] = [];

  for await (const entry of readdirp("src/app", {
    fileFilter: (entry) => {
      return entry.basename === "route.ts" || entry.basename === "page.tsx";
    }
  })) {
    const extract = await extractTextWithinBrackets(entry);

    if (entry.basename === "page.tsx") {
      pages.push(extract);
    } else {
      apies.push(extract);
    }
  }

  const exportText = `
  export const pages = {
    ${pages.join(",\n")}
  }

  export const apis = {
    ${apies.join(",\n")}
  }
  `;

  const targetPath = path.join(process.cwd(), "src/lib/routes.ts");
  await fs.writeFile(targetPath, exportText);
  const { stdout } = await execPromise(`npx prettier ${targetPath} --write`);
  console.log("Success");
})();

async function extractTextWithinBrackets(entry: EntryInfo): Promise<string> {
  const textFile = await fs.readFile(entry.fullPath, "utf8");

  const listMethod = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"];
  const regexMethod = new RegExp(`(${listMethod.join("|")})`, "g");
  const matchMethod = textFile.match(regexMethod);
  const method = matchMethod ? matchMethod[0].trim() : "";

  const str = "/" + _.trim(path.dirname(entry.path), ".");
  const regex = /\[([^\]]+)\]/g;
  const matches = str.match(regex) || [];

  const param = _.map(matches, (match) => {
    const replace = _.trim(match, "[]");
    return `${replace}`;
  });

  const parameters = _.map(matches, (match) => {
    const replace = _.trim(match, "[]");
    return `${replace}: string`;
  });

  const pathResult = _.reduce(
    matches,
    (result, match) => {
      const replace = _.trim(match, "[]");
      return _.replace(result, match, `\${${replace}}`);
    },
    str
  );

  const typeEmpty = `"${str}": "${pathResult}"`;
  const typeSlug = `"${str}": ({${param.join(", ")}}:{${parameters.join(
    ", "
  )}}) => \`${pathResult}\``;

  return _.isEmpty(parameters) ? typeEmpty : typeSlug;
}

function extractBodyRequire(text: string) {
  const regex = /type BodyRequire\s*=\s*([^>]+}>;)/s;
  const match = text.match(regex);

  if (match) {
    const extractedValue = match[1].trim();
    return extractedValue;
  }
  return null;
}
