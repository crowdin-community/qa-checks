## The translation is too short

### Description
Checks the length of words in the source text and the translation, compares it to the minimum percentage.

### Configuration
- `minimalPercent` - The minimum percentage when the translation is not too short. It is calculated in the following way: (the length of the translated words) / (the length of words in the source text).

### Response
This QA check returns a message when the translation is too short.

### Limitations
- ICU strings are not supported.

### Authors
- Vova Karplyuk (karplyuk.vladimir@gmail.com)
