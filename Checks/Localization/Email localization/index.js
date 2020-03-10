var ignoreMassive = ['ignore1example@crowdin.com', 'ignore2example@crowdin.com'];
var yourSourceEmails = ['example1@crowdin.com', 'example2@crowdin.com'];
var yourTargetEmails = [];

switch (crowdin.targetLanguage) {
  case 'uk':
    yourTargetEmails = ['example1@crowdin.ua', 'example2_UA@crowdin.com'];
    break;

  case 'de':
    yourTargetEmails = ['example1@crowdin.de', 'example2_DE@crowdin.com'];
    break;

  case 'pl':
    yourTargetEmails = ['example1_PLN@crowdin.com', 'example2@crowdin.pl'];
    break;

  case 'es':
    yourTargetEmails = ['example1_ESP@crowdin.com', 'example2@crowdin.esp'];
    break;

  default:
    for (var i = 0; i < yourSourceEmails.length; i++) {
      yourTargetEmails.push(SetTargetAt(yourSourceEmails[i], yourSourceEmails[i].lastIndexOf('.'), '.' + crowdin.targetLanguage))
    }
}

// Code section

var result = {
  success: false
};

function SetTargetAt (str, index, chr) {
  if (index > str.length - 1) return str
  return str.substr(0, index) + chr
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
var patternForEmails = new RegExp('(?<=\\s|^)(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,3}))(?=\\s|$|\\.\\s)', 'gm');

var sourceMatch = source.match(patternForEmails);
var translationMatch = translation.match(patternForEmails);
var emailsForLocalization = [];
var emailsLocalizted = [];

if (sourceMatch != null) {
  for (var i = 0; i < sourceMatch.length; i++) {
    (ignoreMassive.indexOf(sourceMatch[i]) === -1 && yourSourceEmails.indexOf(sourceMatch[i]) !== -1) ? emailsForLocalization.push(sourceMatch[i]) : null
  }
}
if (translationMatch != null) {
  for (var i = 0; i < translationMatch.length; i++) {
    (ignoreMassive.indexOf(translationMatch[i]) === -1 && yourTargetEmails.indexOf(translationMatch[i]) !== -1) ? emailsLocalizted.push(translationMatch[i]) : null
  }
}

if (emailsLocalizted == null || emailsForLocalization == null) {
  if (emailsLocalizted == null && emailsForLocalization == null) {
    result.success = true
  } else if (emailsLocalizted == null && emailsForLocalization != null) {
    result.message = 'There are ' + emailsForLocalization.length + ' missed localized email(s) in translation.';
    result.fixes = []
  } else if (emailsLocalizted != null && emailsForLocalization == null) {
    result.message = 'There are ' + emailsLocalizted.length + ' extra localized email(s) in translation.';
    result.fixes = []
  }
} else if (emailsLocalizted.length !== emailsForLocalization.length) {
  if (emailsLocalizted.length <= emailsForLocalization.length) {
    result.message = 'There are ' + (emailsForLocalization.length - emailsLocalizted.length) + ' missed localized email(s) in translation.';
    result.fixes = []
  } else if (emailsLocalizted.length >= emailsForLocalization.length) {
    result.message = 'There are ' + (emailsLocalizted.length - emailsForLocalization.length) + ' extra localized email(s) in translation.';
    result.fixes = []
  }
} else if (emailsLocalizted.length === emailsForLocalization.length) {
  result.success = true
}

return result;
