const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const code = `2 + ( 4 * 8)`;

const ast = parse(code);

// console.log(JSON.stringify(ast, null, 2));

// console.log(JSON.stringify(ast.program.body[0], null, 2));

traverse(ast, {
  NumericLiteral(path) {
    console.log(path.node.value);
  },
  // NumericLiteral: {
  //   enter(path) {
  //     console.log(`Entered ${path.node.value}`);
  //   },
  //   exit(path) {
  //     console.log(`Exit ${path.node.value}`);
  //   },
  // },
});
