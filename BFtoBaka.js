#!/usr/bin/env node

main(process.argv);

function main(args) {
  var code = args[2].replace(/(?![\.,\+<>\-\[\]])/g, '');
  var result = "";
  for (var i = 0; i < code.length; i++) {
    switch (code.charAt(i)) {
      case '.':	
        result += "!.";
      break;
      
      case ',':	
      	result += ".!";
      break;
      
      case '+':
        result += "..";
      break
      
      case '-':
        result += "!!";
      break
      
      case '<':
        result += "?.";
      break
      
      case '>':
        result += ".?";
      break
      
      case '[':
        result += "!?";
      break
      
      case ']':
        result += "?!";
      break
      
      default:
        break
    }
   }
      console.log(result);
}