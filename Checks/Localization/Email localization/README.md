## Email localization

### Description
Inspects whether the emails are correctly localized in translation.

### Configuration
- `ignoreMassive` - The list of the emails that shouldn't be translated.
- `yourSourceEmails` - The list of the emails that should be translated.
- `yourTargetEmails` - The list of the translated emails for each target language.

### Response
This QA check returns a message with the mismatch of the email in the translation.

### Limitations
- ICU strings are not supported.

### Authors
- Vova Karplyuk (karplyuk.vladimir@gmail.com)
