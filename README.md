# Custom Quality Assurance Checks

The custom quality assurance (QA) checks help efficiently handle language-specific aspects such as punctuation, numbers, and regular expressions to ensure more accurate QA check results and high-quality translation in all languages.

With custom QA checks you can detect the exact mistakes you need. It helps customers to avoid the mistakes in the suggestions and to translate the content more proficiently.

## Code snippet

To make the QA check work you need to provide the Javascript-based code snippet.

Every code snippet includes a `crowdin` object and the number of following properties:

```js
object crowdin {
    string sourceLanguage,
    string targetLanguage,

    object context {
      ?int maxLength,
      ?string pluralForm
    },
    string contentType,
    string source,
    string translation
}
```

Every code snippet should return the [response](https://support.crowdin.com/enterprise/code-snippet-qa-checks/#code-snippet-response) whether the custom QA checks have passed successfully or failed.

We recommend using [Custom Script Editor](https://github.com/crowdin/crowdin-script-editor) as the tool for the development and debugging for Crowdin custom QA checks.

### Limitations
Crowdin code snippet has the following limitations:

- The code is completely sandboxed. Neither the browser context nor NodeJS context is available
- Standard objects like `date`, `math` and similar ones aren't available
- Crowdin limits the time of running the custom QA check: the user’s code can run up to 100 ms. If the code snippet is too complex or has any mistakes, the custom QA check can be processed longer and will be stopped. In this case, the issues should be corrected. Then QA check should be run again.

To learn more details about creating your own custom QA checks, please read [Code Snippet for Custom QA Checks](https://support.crowdin.com/enterprise/code-snippet-qa-checks/) article.

## Index

1. Generic
    + [Colors](/Checks/Generic/Colors)
    + [Emoji](/Checks/Generic/Emoji)
    + [Extra phone number](/Checks/Generic/Extra%20phone%20number)
    + [Keyboard shortcuts](/Checks/Generic/Keyboard%20shortcuts)
    + [Missing phone number](/Checks/Generic/Missing%20phone%20number)
    + [Same count of phone numbers](/Checks/Generic/Same%20count%20of%20phone%20numbers)
    + [The translation is too short](/Checks/Generic/Translation%20too%20short)
2. Localization
    + [Email localization](/Checks/Localization/Email%20localization)
    + [File name localization](/Checks/Localization/File%20name%20localization)
    + [URL localization](/Checks/Localization/URL%20localization)
3. Numbers
    + [Extra numbers](/Checks/Numbers/Extra%20numbers)
    + [Missing numbers](/Checks/Numbers/Missing%20numbers)
    + [Same count of the numbers](/Checks/Numbers/Same%20count%20of%20numbers)
4. Punctuation
    + [Duplicate punctuation symbols](/Checks/Punctuation/Duplicate%20punctuation%20symbols)
    + [Language specific punctuation](/Checks/Punctuation/Language%20specific%20punctuation)
    + [Space after punctuation](/Checks/Punctuation/Space%20after%20punctuation)
5. Symbols
    + [Forbidden characters](/Checks/Symbols/Forbidden%20characters)
    + [Math](/Checks/Symbols/Math)
    + [Two or more capital letters](/Checks/Symbols/Two%20or%20more%20capitals)
6. Words
    + [Duplicate words](/Checks/Words/Duplicate%20words)

## License

<pre>
Custom Quality Assurance Checks are licensed under the MIT License.
See the LICENSE file distributed with this work for additional 
information regarding copyright ownership.
</pre>
