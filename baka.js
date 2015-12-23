#!/usr/bin/env node

function main(code) {
  var array        = Array.apply(null, Array(30000)).map(function () { return 0; });
  var source       = toBF(code.replace(/(?![\.\?!]+)/g, ''));
  var s = e = loop = Array.apply(null, Array(source.length)).map(function () { return 0; });
  var pointer      = 0;
  var input_index  = -1;

  for (i = 0; i < source.length && pointer >= 0; i++) { 
    if (source.charAt(i) == '[') loop[++pointer] = i;
    if (source.charAt(i) == ']') {                                             
      s[i] = loop[pointer]; 
      e[loop[pointer]] = i; 
      pointer--;                                      
    }
  }
  if (pointer != 0) { 
    console.log("Missing Brackets");
    return;
  }
 
  for (i = 0; i < source.length; i++) {
      switch (source.charAt(i)) {
      case '<':              
        pointer--
      break                   
      case '>':                
        pointer++             
      break                  
      case '+':
        array[pointer]++
      break
      case '-':
        array[pointer]--
      break
      case ']':
        i = s[i]
      case '[':
        if (array[pointer] == 0) i = e[i]
      break
      case ',':
        array[pointer] = process.argv[3].charCodeAt(input_index++);
      break
      case '.':                                   
        process.stdout.write(String.fromCharCode(array[pointer]))
      break
    }
  }
}


function toBF(source) {
  var result = "";
  
  for (var i = 0; i < source.length; i+=2) {
    var current_char = source.charAt(i);
    var next_char    = source.charAt(i+1);
    
    switch (current_char) {
    case '.':
      if (next_char == '.')      result += '+'
      else if (next_char == '!') result += ','
      else if (next_char == '?') result += '>'
    break
    
    case '!':
      if (next_char == '.')      result += '.'
      else if (next_char == '!') result += '-'
      else if (next_char == '?') result += '['
    break

    case '?':
      if (next_char == '.')      result += '<'
      else if (next_char == '!') result += ']'
    } 
  }
  return result 
}

exec  = require('child_process').exec;
file  = process.argv[2];
child = exec('cat ' + file, function (error, stdout, stderr) {
  main(stdout);
});

