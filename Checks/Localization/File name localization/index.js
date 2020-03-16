var yourMainFileNames = ['example1.txt', 'example2.txt'];
var yourTargetFileNames = [];

switch (crowdin.targetLanguage) {
  case 'uk':
    yourTargetFileNames = ['example1_UA.txt', 'example2_UA.txt'];
    break;

  case 'de':
    yourTargetFileNames = ['example1_DE.txt', 'example2_DE.txt'];
    break;

  case 'pl':
    yourTargetFileNames = ['example1_PLND.txt', 'example2_PLND.txt'];
    break;

  case 'es':
    yourTargetFileNames = ['example1_ESP.txt', 'example2_ESP.txt'];
    break;

  default:
    for (var i = 0; i < yourMainFileNames.length; i++) {
      yourTargetFileNames.push(SetCharAt(yourMainFileNames[i], yourMainFileNames[i].lastIndexOf('.'), '_' + crowdin.targetLanguage + '.'))
    }
}

var result = {
  success: false
};

/**
 * @return {string}
 */
function SetCharAt (str, index, chr) {
  if (index > str.length - 1) return str;

  return str.substr(0, index) + chr + str.substr(index + 1)
}

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

var translation = crowdin.translation;
var patternForFileNames = new RegExp('(?<=\\s|^)[a-z0-9A-Z_\\.]+\\.[A-Za-z]{1,3}(?=\\s|$|\\.\\s)', 'gm');
var sourceMatch = source.match(patternForFileNames);
var translationMatch = translation.match(patternForFileNames);
var fileNamesForLocalization = [];
var fileNamesLocalized = [];

if (sourceMatch != null) {
  for (var i = 0; i < sourceMatch.length; i++) {
    (yourMainFileNames.indexOf(sourceMatch[i]) !== -1) ? fileNamesForLocalization.push(sourceMatch[i]) : null
  }
}

if (translationMatch != null) {
  for (var i = 0; i < translationMatch.length; i++) {
    (yourTargetFileNames.indexOf(translationMatch[i]) !== -1) ? fileNamesLocalized.push(translationMatch[i]) : null
  }
}

if (fileNamesLocalized == null || fileNamesForLocalization == null) {
  if (fileNamesLocalized == null && fileNamesForLocalization == null) {
    result.success = true
  } else if (fileNamesLocalized == null && fileNamesForLocalization != null) {
    result.message = 'There are ' + fileNamesForLocalization.length + ' missed localized file name(s) in the translation.';
    result.fixes = []
  } else if (fileNamesLocalized != null && fileNamesForLocalization == null) {
    result.message = 'There are ' + fileNamesLocalized.length + ' extra localized file name(s) in the translation.';
    result.fixes = []
  }
} else if (fileNamesLocalized.length !== fileNamesForLocalization.length) {
  if (fileNamesLocalized.length <= fileNamesForLocalization.length) {
    result.message = 'There are ' + (fileNamesForLocalization.length - fileNamesLocalized.length) + ' missed localized file name(s) in the translation.';
    result.fixes = []
  } else if (fileNamesLocalized.length >= fileNamesForLocalization.length) {
    result.message = 'There are ' + (fileNamesLocalized.length - fileNamesForLocalization.length) + ' extra localized file name(s) in the translation.';
    result.fixes = []
  }
} else if (fileNamesLocalized.length === fileNamesForLocalization.length) {
  result.success = true
}

return result;
