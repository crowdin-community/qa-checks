var numberInWordPattern = new RegExp('(?<=\\s|^|[])(\\d{1,}[%]{0,1}|((\\d){1,})([,.](\\d)*[%]{0,1}))(?=\\s|[\\.,-\\/#!$%\\^\&\\*;:{}=\\-_`~()]$|$|[\\.,-\\/#!$%\\^\&\\*;:{}=\\-_`~()]\\s)', 'gmu')

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

while (matchIterator = numberInWordPattern.exec(source)) {
  sourceMatchArray.push(matchIterator[1])
}

var translationMatchArray = [];

while (matchIterator = numberInWordPattern.exec(translation)) {
  translationMatchArray.push(matchIterator[1])
}

var missingNumbersSource = differenceBetweenTwoArrays(sourceMatchArray, translationMatchArray);

if (missingNumbersSource.length !== 0) {
  result.message = 'There are missing numbers in the translation: ' + missingNumbersSource.join(', ');
  result.fixes = [];
} else {
  result.success = true;
}

return result;
