#!/usr/bin/env node

// Module dependencies

var fs = require('fs');
var path = require('path');
var commander = require('commander');
var pangu = require('../src/pangu');

// CLI

commander
  .version(pangu.VERSION)
  .option('-n, --noncover', 'non overwrite original file')
  .option('-r, --recursive', 'include child dictionary')
  .parse(process.argv);

// Path

var fullPath = commander.args;

if (!fullPath.length) {
  console.error('files required');
  process.exit(1);
}

parseFiles(fullPath, true, function(err, path){
  read(err, path, write);
});

function parseFiles(fullPath, recursive, fn){
  fn = fn || function(){};
  fullPath = (fullPath instanceof Array) ? fullPath : [fullPath];
  
  fullPath.forEach(function(pathes){
    fs.stat(pathes, function(err, stat){
      if(err) return fn(err); 
      
      if(stat.isDirectory() && recursive){
        fs.readdir(pathes, function(err, files){
          if(err) throw err;
          files.map(function(file){
            return path.join(pathes, file);
          })
          .forEach(function(file){
            (commander.recursive) ? parseFiles(file, true, fn) : parseFiles(file, false, fn);
          });
        });
      }
      else if(stat.isFile()){
        return fn(null, pathes);
      }
    });
  });
}

function read(err, path, fn){
  fn = fn || function(){};
  if(err) return fn(err);
  
  fs.readFile(path, function(err, data){
    data = data.toString();
    data = pangu.insert_space(data);
    fn(err, path, data, message);
  });
}

function write(err, file, str, fn){
  fn = fn || function(){};
  if(err) return fn(err);  
  
  var dirname = path.dirname(file);
  var extname = path.extname(file);
  var basename = path.basename(file, extname);
  
  if(commander.noncover){
    file = path.join(dirname, (basename + '_pangu' + extname));
  }
  
  fs.writeFile(file, str, function(err){
    if(err) return fn(err);
  });
  
  fn(file + ' is saved');
}

function message(str){
  console.log(str);
}
