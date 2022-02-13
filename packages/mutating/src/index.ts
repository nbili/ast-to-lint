import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import * as types from "@babel/types";
import * as prettier from "prettier";

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

  let fileContainImport = false;

  traverse(ast, {
    JSXElement({ node }) {
      const { openingElement, closingElement } = node;
      if (
        openingElement.name.type === "JSXIdentifier" &&
        openingElement.name.name === "IconButton"
      ) {
        const hasOnClickIconButton = openingElement.attributes.find(
          (attribute) =>
            attribute.type === "JSXAttribute" &&
            attribute.name.type === "JSXIdentifier" &&
            attribute.name.name === "onClick"
        );

        if (!hasOnClickIconButton) return;

        fileContainImport = true;

        const newProps: types.JSXAttribute[] = [];
        openingElement.attributes.forEach((attribute) => {
          if (
            attribute.type === "JSXAttribute" &&
            attribute.name.type === "JSXIdentifier"
          ) {
            switch (attribute.name.name) {
              case "onClick":
                newProps.push(attribute);
                break;
              case "edge":
                if (attribute?.value?.type === "StringLiteral") {
                  const end = attribute.value.value;

                  if (end !== "start") {
                    newProps.push(
                      types.jsxAttribute(
                        types.jsxIdentifier("edge"),
                        types.stringLiteral("start")
                      )
                    );
                  }
                }
                break;
              case "aria-label":
                newProps.push(attribute);
                break;
            }
          }
        });

        openingElement.name.name = "TestButton";

        openingElement.attributes = newProps;

        if (closingElement?.name?.type === "JSXIdentifier") {
          closingElement.name.name = "TestButton";
        }
      }
    },
  });

  if (fileContainImport) {
    const relativePathToImport = path.relative(
      path.dirname(file),
      `@/components/TestButton.js`
    );

    const buttonComponentImport = types.importDeclaration(
      [
        types.importSpecifier(
          types.identifier("TestButton"),
          types.identifier("TestButton")
        ),
      ],
      types.stringLiteral(relativePathToImport)
    );

    ast.program.body.unshift(buttonComponentImport);
  }

  const { code } = generate(ast);

  const formattedCode = prettier.format(code, { filepath: file });

  fs.writeFileSync(file, formattedCode);
});
