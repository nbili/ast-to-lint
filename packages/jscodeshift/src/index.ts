import { Transform, jsxAttribute } from "jscodeshift";
import * as path from "path";
import * as prettier from "prettier";

const transform: Transform = (fileInfo, api) => {
  const j = api.jscodeshift;

  const root = j(fileInfo.source);

  let fileContainsButton = false;

  if (fileContainsButton) {
    return root.toSource();
  } else {
    return null;
  }
};

export default transform;
