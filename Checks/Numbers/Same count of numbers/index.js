var numberInWordPattern = new RegExp('(?<=\\s|^|[])(\\d{1,}[%]{0,1}|((\\d){1,})([,.](\\d)*[%]{0,1}))(?=\\s|[\\.,-\\/#!$%\\^\&\\*;:{}=\\-_`~()]$|$|[\\.,-\\/#!$%\\^\&\\*;:{}=\\-_`~()]\\s)', 'gmu');

var result = {
  success: false
};

if (crowdin.contentType === 'application/vnd.crowdin.text+plural') {
  var obj = JSON.parse(crowdin.source);

  if (obj[crowdin.context.pluralForm] != null) {
    source = obj[crowdin.context.pluralForm]
  } else {
    source = obj.other
  }
} else {
  source = crowdin.source
}

translation = crowdin.translation;

sourceMatchArray = source.match(numberInWordPattern);
translationMatchArray = translation.match(numberInWordPattern);
sourceInsertedWordCount = sourceMatchArray !== null ? sourceMatchArray.length : 0;
translationInsertedWordCount = translationMatchArray !== null ? translationMatchArray.length : 0;

if (sourceInsertedWordCount !== translationInsertedWordCount) {
  result.message = 'Count of numbers in translation and source is different: ' + sourceInsertedWordCount + ' in source, ' + translationInsertedWordCount + ' in translation.';
  result.fixes = [];
} else {
  result.success = true;
}

return result;
