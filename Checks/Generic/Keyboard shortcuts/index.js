var result = { success: false };
var solution = [];

Array.prototype.difference = function (array) {
  var difference = this.copy();

  for (var i = 0; i < array.length; i++) {
    if (difference.includes(array[i])) {
      difference.splice(difference.indexOf(array[i], 1))
    }
  }
  return difference
};

Array.prototype.copy = function () {
  return this.slice(0)
};

Array.prototype.includes = function (element) {
  return (this.indexOf(element) !== -1)
};

patern = /(\S*\s?\+\s?)+\S*/g;

source = crowdin.source.match(patern) || [];
translation = crowdin.translation.match(patern) || [];
translation_text = crowdin.translation;

sourceDiff = source.difference(translation);
translationDiff = translation.difference(source);

if (sourceDiff.length === 0 && translationDiff.length === 0) {
  result.success = true
} else {
  if (sourceDiff.length === 0) {
    for (var i = 0; i < translationDiff.length; i++) {
      result.message = 'There are extra emoji in the translation.';

      var temporary_variable = translation_text.indexOf(translationDiff[i]);

      solution.push({
        from_pos: temporary_variable,
        to_pos: temporary_variable+translationDiff[i].length,
        replacement: ''
      })
    }
  } else if (translationDiff.length === 0) {
    result.message = 'There are missing shortcuts in the translation: ' + sourceDiff;
  } else {
    result.message = 'There are different shortcuts in the source text and translation. ';
    result.message += 'Extra shortcuts (' + translationDiff + ')';
    result.message += 'Missing shortcuts (' + sourceDiff + ')'
  }
}

if (result.success === false) {
  result.fixes = solution
}

return result;
