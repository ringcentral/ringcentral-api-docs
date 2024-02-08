# Text punctuation

The Text Punctuation API takes a list of text blocks and augments them with proper punctuation using artificial intelligence. The same feature is applied to the [speech recognition API's](speech-to-text.md) output if the `enablePunctuation` flag is set. The API will augment text with the following punctuation:

* Periods, full-stop: `.`
* Commas: `,`
* Quotes: `'` `"`
* Question marks: `?`
* Exclamation marks: `!`
* Apostrophes: `'`, contractions and possessive forms
* Proper capitalization, sentence-cap and acronyms

## Augmenting text with proper punctuation

### Request parameters

| Parameter | Type        | Description                     |
| --------- | ----------- | ------------------------------- |
| `texts`   | List        | List of unformatted text blobs. |

### Sample code

The following example code shows how to provide the text paragraphs to the API and get the texts grammarly punctuated.

Follow the instructions on the [quick start](../quick-start#) section to setup and run your server code before running the sample code below.

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.
    * You can only run on your production account, this means that you have to use app credentials for production.

=== "JavaScript"

    ```javascript
    {!> code-samples/ai/code-snippets-headers/header.js [ln:1-12] !}
    {!> code-samples/ai/code-snippets/punctuation.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/ai/code-snippets/punctuation.py !}
    {!> code-samples/ai/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/ai/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/ai/code-snippets/punctuation.php [ln:2-] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/ai/code-snippets/punctuation.rb !}
    {!> code-samples/ai/code-snippets-headers/footer.rb [ln:1-4] !}
    ```    

=== "C#"

    ```c#
    {!> code-samples/ai/code-snippets/punctuation.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/ai/code-snippets/punctuation.java !}
    ```

### Sample response

```json
{!> code-samples/ai/punctuate-response.json !}
```
