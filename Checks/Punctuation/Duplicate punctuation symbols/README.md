## Duplicate punctuation symbols

### Description
Checks whether translation contains duplicated punctuation symbols.

### Configuration
- `arrayOfPunctuation` - The list of punctuation symbols to check.

### Response
This QA check returns the error message and the list of fixes (removing extra punctuation symbols).

### Limitations
- Plural strings are not supported.
- ICU strings are not supported.

### Authors
- Vladimir Burmistr (burmistrv@gmail.com)
