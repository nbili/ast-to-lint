import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";

const files = glob.sync(
  path.resolve(__dirname, "../../../examples/todo-list-react-hooks/src/**/*.js")
);

files.forEach((file) => {
  const contents = fs.readFileSync(file).toString();

  console.log(contents);
});
