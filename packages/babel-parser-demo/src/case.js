const { parse } = require("@babel/parser");

const code = `2 + ( 4 * 8)`;

const ast = parse(code);

// console.log(JSON.stringify(ast, null, 2));

console.log(JSON.stringify(ast.program.body[0], null, 2));
