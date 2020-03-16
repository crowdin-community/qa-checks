var yourMainDomainUrl = 'crowdin.com';
var yourTargetDomainUrl;

switch (crowdin.targetLanguage) {
  case 'uk':
    yourTargetDomainUrl = 'crowdin.ua';
    break;

  case 'de':
    yourTargetDomainUrl = 'crowdin.de';
    break;

  case 'pl':
    yourTargetDomainUrl = 'crowdin.com.pl';
    break;

  case 'es':
    yourTargetDomainUrl = 'crowdin.es';
    break;

  default:
    yourTargetDomainUrl = yourMainDomainUrl;
    break
}

// Code section

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

var translation = crowdin.translation;
var patternForMainDomain, patternForTargetDomain;

patternForMainDomain = new RegExp('(?<=\\s|^)((https?):\/\/|(https?):\/\/www.)' + yourMainDomainUrl.replace('.', '\\.') + '(?=\\s|$|\\.\\s)', 'gm');
patternForTargetDomain = new RegExp('(?<=\\s|^)((https?):\/\/|(https?):\/\/www.)' + yourTargetDomainUrl.replace('.', '\\.') + '(?=\\s|$|\\.\\s)', 'gm');

var sourceMatch = source.match(patternForMainDomain);
var translationMatch = translation.match(patternForTargetDomain);

if (sourceMatch == null || translationMatch == null) {
  if (sourceMatch == null && translationMatch == null) {
    result.success = true
  } else if (sourceMatch == null && translationMatch != null) {
    result.message = 'There are ' + translationMatch.length + ' extra localized URL in translation.';
    result.fixes = []
  } else if (sourceMatch != null && translationMatch == null) {
    result.message = 'There are ' + sourceMatch.length + ' missed localized URL in translation.';
    result.fixes = []
  }
} else if (sourceMatch.length !== translationMatch.length) {
  if (sourceMatch.length <= translationMatch.length) {
    result.message = 'There are ' + (translationMatch.length - sourceMatch.length) + ' extra localized URL in translation.';
    result.fixes = []
  } else if (sourceMatch.length >= translationMatch.length) {
    result.message = 'There are ' + (sourceMatch.length - translationMatch.length) + ' missed localized URL in translation.';
    result.fixes = []
  }
} else if (sourceMatch.length === translationMatch.length) {
  result.success = true
}

return result;
