import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";

import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

const files = glob.sync(
  path.resolve(
    __dirname,
    "../../../examples/todo-list-react-hooks/src/**/*.jsx"
  )
);

files.forEach((file) => {
  const contents = fs.readFileSync(file).toString();

  const ast = parse(contents, { sourceType: "module", plugins: ["jsx"] });

  traverse(ast, {
    JSXOpeningElement({ node }) {
      if (
        node.name.type === "JSXIdentifier" &&
        node.name.name === "IconButton"
      ) {
        node.name.name = `TestButton`;
      }
    },
  });

  const { code } = generate(ast);

  fs.writeFileSync(file, code);
});
