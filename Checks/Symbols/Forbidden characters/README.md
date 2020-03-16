## Forbidden characters

### Description
Detects the forbidden characters in the translation according to the predefined configurable list.

### Configuration
- `characters` - The list of the forbidden characters.

### Response
This QA check returns a list of the unique forbidden characters that were found in the translation. If there are more than 5 - the first 5 only will be displayed.

### Limitations
- Plural strings are not supported.
- ICU strings are not supported.

### Authors
- Vova Karplyuk (karplyuk.vladimir@gmail.com)
