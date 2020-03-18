/**
 * Config section
 * Define the forbidden characters list below below
 */

var characters = ['!', '@', '#', '$', '%', '&'];

/**
 * Code section
 */

var result = {
  success: false
};

function UniqueCharacters (inputArray) {
  var outputArray = [],
    currentCharacter;

  for (var i = 0; i < inputArray.length; i++) {
    currentCharacter = inputArray[i];

    if (!~outputArray.indexOf(currentCharacter)) {
      outputArray.push(currentCharacter)
    }
  }

  return outputArray
}

var translation = crowdin.translation,
  regex = new RegExp('[' + characters.join('') + ']', 'g');

translationMatch = translation.match(regex);

if (translationMatch != null) {
  var uniqueArray = UniqueCharacters(translationMatch),
    solution = [],
    tempIndex;

  result.message = 'The translation contains the following forbidden character(s) ' + translationMatch.length + ' time(s): ';

  if (uniqueArray.length < 6) {
    result.message += '"' + uniqueArray.join('", "') + '".'
  } else {
    result.message += '"' + uniqueArray.slice(0, 5).join('", "') + '" and other.'
  }

  for (var i = 0; i < translationMatch.length; i++) {
    tempIndex = regex.exec(translation).index;

    solution[i] = {
      from_pos: tempIndex,
      to_pos: tempIndex + 1,
      replacement: ''
    }
  }
  result.fixes = solution
} else {
  result.success = true
}

return result;
