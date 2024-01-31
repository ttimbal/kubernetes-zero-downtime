import * as fs from "fs";

const color = process.env.npm_config_my_color;
if (!color) {
  console.error('No color provided');
  process.exit(1);
}

console.log('Color to use: ', color);


//const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', 'gray', 'pink', 'brown', 'orange'];

const content = fs.readFileSync( './template.yml', 'utf-8');
const newContent = content.replaceAll('{{COLOR}}', color )

fs.writeFileSync('./kub.yml', newContent);

