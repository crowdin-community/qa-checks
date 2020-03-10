## URL localization

### Description
Inspects whether URLs are correctly translated.

### Configuration
- `yourMainDomainUrl` - The list of URLs, that should be translated.
- `yourTargetDomainUrl` - The list of translated URLs for each target language.

### Response
This QA check returns a message with the mismatch between URLs in the source text and the translated URLs.

### Limitations
- ICU strings are not supported.

### Authors
- Vova Karplyuk (karplyuk.vladimir@gmail.com)
