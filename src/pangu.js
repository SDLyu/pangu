exports.VERSION = '1.0.0';

function insert_space(text) {
  /*
  英文、數字、符號 ([a-z0-9~!@#&;=_`\$\%\^\*\-\+\,\.\/(\\)\?\:\'\"\[\]\(\)])
  中文 ([\u4E00-\u9FFF])
  日文 ([\u3040-\u30FF])
  http://www.diybl.com/course/6_system/linux/Linuxjs/20090426/165435.html
  */
   
  // 中文在前
  text = text.replace(/([\u4e00-\u9fa5\u3040-\u30FF])([a-z0-9@&=_`\[\$\%\^\*\-\+\(\/\\])/ig, '$1 $2');
   
  // 中文在後
  text = text.replace(/([a-z0-9!~&;=_`\]\,\.\:\?\$\%\^\*\-\+\)\/\\])([\u4e00-\u9fa5\u3040-\u30FF])/ig, '$1 $2');
   
  // 字"字"字 >> 字 "字" 字
  text = text.replace(/([\u4e00-\u9fa5\u3040-\u30FF])(\"|\'(\S+))/ig, '$1 $2');
  text = text.replace(/((\S+)\'|\")([\u4e00-\u9fa5\u3040-\u30FF])/ig, '$1 $3'); // $2 是 (\S+)
   
  return text;
}

exports.insert_space = insert_space;

