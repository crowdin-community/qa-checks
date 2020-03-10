var phoneNumberPattern = new RegExp('(?<=\\s|^)([+]{1,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]+)(?=\\s|$)', 'gm');

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

function removeElementFromArray (arrayToRemoveFrom, Element) {
  for (var i = 0; i < arrayToRemoveFrom.length; i++) {
    if (arrayToRemoveFrom[i] === Element) {
      arrayToRemoveFrom.splice(i, 1);

      break
    }
  }

  return arrayToRemoveFrom
}

function differenceBetweenTwoArrays (decreasingArray, deductionArray) {
  var tempDecreasingArray = decreasingArray.slice(0);
  var tempDeductionArray = deductionArray.slice(0);

  for (i = 0; i < tempDeductionArray.length; i++) {
    removeElementFromArray(tempDecreasingArray, tempDeductionArray[i])
  }

  return tempDecreasingArray
}

var sourceMatchArray = [];

while (matchIterator = phoneNumberPattern.exec(source)) {
  sourceMatchArray.push(matchIterator[1])
}

var translationMatchArray = [];

while (matchIterator = phoneNumberPattern.exec(translation)) {
  translationMatchArray.push(matchIterator[1])
}

var extraNumbersInTranslate = differenceBetweenTwoArrays(translationMatchArray, sourceMatchArray).slice(0);

if (extraNumbersInTranslate.length !== 0) {
  result.message = 'The translation has extra/changed phone number(s): ' + extraNumbersInTranslate;
  result.fixes = [];

  while ((matchInfo = phoneNumberPattern.exec(translation)) !== null) {
    if (extraNumbersInTranslate.indexOf(matchInfo[0]) !== -1) {
      var fix = {
        from_pos: matchInfo.index,
        to_pos: phoneNumberPattern.lastIndex,
        replacement: ''
      };

      result.fixes.splice(0, 0, fix);
      removeElementFromArray(extraNumbersInTranslate, matchInfo[0])
    }
  }
} else {
  result.success = true;
}

return result;
