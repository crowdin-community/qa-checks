var arrayOfPunctuation = [',','.',':',';','!','?'];

var duplicatedPunctuationsPattern = new RegExp('(?<!\\.)(?!\\.{3}(?!\\.))(['+arrayOfPunctuation.join('')+'])\\1+', 'gmu');

var result = {
  success: false
};

translation = crowdin.translation;

var translationMatchArray = translation.match(duplicatedPunctuationsPattern);

if (translationMatchArray != null) {
  result.message = 'There are duplicated punctuation symbols in the translation.';
  result.fixes = [];

  while ((matchInfo = duplicatedPunctuationsPattern.exec(translation))) {
    var fix;

    if(matchInfo[0].indexOf('.') !== -1 && matchInfo[0].length > 3) {
      fix = {
        from_pos: matchInfo.index,
        to_pos: matchInfo.index + matchInfo[0].length,
        replacement: '...'
      };
    } else {
      fix = {
        from_pos: matchInfo.index,
        to_pos: matchInfo.index + matchInfo[0].length,
        replacement: matchInfo[0][0]
      };
    }

    result.fixes.splice(0, 0, fix)
  }
} else {
  result.success = true;
}

return result;
