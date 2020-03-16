var wordsWithTwoCapitalPattern = new RegExp('(?<=\\s|^)[\\p{Lu}\\p{Lt}]([\\p{Lu}\\p{Lt}]+)[\\p{L}]*', 'gmu');

var result = {
  success: false
};

translation = crowdin.translation;

var translationMatchArray = translation.match(wordsWithTwoCapitalPattern);

if (translationMatchArray != null) {
  result.message = 'The translation text has word(s) starting from 2 or more capitals. Words: ' + translationMatchArray;
  result.fixes = [];

  while ((matchInfo = wordsWithTwoCapitalPattern.exec(translation)) !== null) {
    var fix = {
      from_pos: matchInfo.index + 1,
      to_pos: matchInfo.index + matchInfo[1].length + 1,
      replacement: matchInfo[1].toLowerCase()
    };

    result.fixes.splice(0, 0, fix);
  }
} else {
  result.success = true;
}

return result;
