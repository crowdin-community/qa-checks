/**
 * Config section
 * Define the punctuation symbols below
 */

var arrayOfPunctuation = [',','.',':',';','!','?'];

/**
 * Code section
 */

var spaceAfterPunctuationPattern = new RegExp('(?<!\\d)(['+arrayOfPunctuation.join('')+'])(?!['+arrayOfPunctuation.join('')+']|['+arrayOfPunctuation.join('')+'\\s\\d])', 'gmu');

var result = {
  success: false
};

translation = crowdin.translation;

var translationMatchArray = translation.match(spaceAfterPunctuationPattern);

if (translationMatchArray != null) {
  result.message = 'The translation text has punctuation without space after.';
  result.fixes = [];

  while ((matchInfo = spaceAfterPunctuationPattern.exec(translation))) {
    var fix = {
      from_pos: matchInfo.index,
      to_pos: matchInfo.index + matchInfo[0].length,
      replacement: matchInfo[0]+' '
    };

    result.fixes.splice(0, 0, fix)
  }
} else {
  result = {
    success: true
  }
}

return result;
