var config = {
  "es": {
    "¿": "?",
    "¡": "!"
  }
};

var result = {
  success: false
};

if (crowdin.targetLanguage !== "es") {
  result.success = true;

  return result;
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
var sourceRegex = new RegExp('[' + Object.values(config['es']).join('') + ']', 'g');
var translationRegex = new RegExp('[' + Object.getOwnPropertyNames(config["es"]).join('') + ']', 'g');

var sourceMatch = source.match(sourceRegex);
var translationMatch = translation.match(translationRegex);

/**
 * @return {string}
 */
function JoinWithQuotes (array) {
  return array.length < 5 ? '"' + array.join('", "') + '"' : array.slice(0, 5).join('", "') + '" and other'
}

function UniqueCharacters (inputArray) {
  var outputArray = [];
  var currentCharacter;

  for (var i = 0; i < inputArray.length; i++) {
    currentCharacter = inputArray[i];

    if (!~outputArray.indexOf(currentCharacter)) {
      outputArray.push(currentCharacter)
    }
  }
  return outputArray
}

function IndicesCounter(inputCharacters) {
  var indices = [];
  var outputArray = {};
  var currentIndex;
  var uniqueInput = UniqueCharacters(inputCharacters);

  for (var i = 0; i < uniqueInput.length; i++) {
    currentIndex = inputCharacters.indexOf(uniqueInput[i]);

    while(currentIndex !== -1) {
      indices.push(currentIndex);
      currentIndex = inputCharacters.indexOf(uniqueInput[i], currentIndex + 1);
    }

    outputArray[uniqueInput[i]] = indices.length;
    indices = []
  }

  return outputArray
}

var sourceResult;
sourceMatch !== null ? sourceResult = IndicesCounter(sourceMatch) : null;
var translationResult = translationMatch !== null ? translationResult = IndicesCounter(translationMatch) : null;
var sourcePropertyValues = Object.values(config["es"]);
var sourcePropertyNames = Object.getOwnPropertyNames(config["es"]);

var sourceResultPropertyNames;
sourceResult !== undefined ? sourceResultPropertyNames = Object.getOwnPropertyNames(sourceResult) : null;

var translationResultPropertyNames;
translationResult !== null ? translationResultPropertyNames = Object.getOwnPropertyNames(translationResult) : null;

if (sourceMatch !== null) {
  var notLocalizedSymbols = [];

  if (translationResult === null) {
    result.fixes = [];
    result.message = 'Please localize next punctuation symbol(s): ' + JoinWithQuotes(sourceResultPropertyNames) + '.'
  } else { // Output mismatch
    for (i = 0; i < sourcePropertyValues.length; i++) {
      if (translationResult[sourcePropertyNames[sourcePropertyValues.indexOf(sourcePropertyValues[i])]] < sourceResult[sourcePropertyValues[i]]) {
        notLocalizedSymbols.push('"' + [sourcePropertyValues[i]] + '" doesn\'t localized ' + (sourceResult[sourcePropertyValues[i]] - translationResult[sourcePropertyNames[sourcePropertyValues.indexOf(sourcePropertyValues[i])]]) + ' time(s)')
      } else if (translationResult[sourcePropertyNames[sourcePropertyValues.indexOf(sourcePropertyValues[i])]] > sourceResult[sourcePropertyValues[i]]) {
        notLocalizedSymbols.push('"' + [sourcePropertyValues[i]] + '" extra localized ' + (translationResult[sourcePropertyNames[sourcePropertyValues.indexOf(sourcePropertyValues[i])]] - sourceResult[sourcePropertyValues[i]]) + ' time(s)')
      } else if (translationResult[sourcePropertyNames[sourcePropertyValues.indexOf(sourcePropertyValues[i])]] === undefined) {
        notLocalizedSymbols.push('"' + sourceResult[config["es"][[sourcePropertyValues[i]]]] + '" doesn`t localized ' + sourceResult[sourcePropertyValues[i]] + ' time(s)')
      } else if (sourceResult[sourcePropertyValues[i]] === undefined) {
        notLocalizedSymbols.push('"' + [sourcePropertyValues[i]] + '" extra localized ' + translationResult[sourcePropertyNames[sourcePropertyValues.indexOf(sourcePropertyValues[i])]] + ' time(s)')
      }
    }

    if (!notLocalizedSymbols.length) {
      result.success = true;
    } else {
      result.fixes = [];
      result.message = 'The following issue(s) found: ' + notLocalizedSymbols.join(', ') + '.'
    }
  }
} else {
  result.success = true
}

return result;
