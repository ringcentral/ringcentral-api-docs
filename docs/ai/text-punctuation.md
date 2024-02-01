# Smart punctuation

The Smart Punctuation API takes a block of text and augments it with proper punctuation using artificial intelligence, and is specifically optimized in the processing of [speech recognition](speech-to-text.md) output. The API will augment text with the following punctuation:

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

### Example code

After you have setup a [simple web server to process the response](asynchronous-responses.md), copy and paste the code from below in a file. In the process, make sure to edit the variables found in ALL CAPS to ensure your code runs properly. 

=== "Javascript"

    ```javascript
    {!> code-samples/ai/punctuate.js !}
    ```

    Run your sample code.

    ```bash
    $ node index.js
    ```

=== "Python"

    ```python
    {!> code-samples/ai/punctuate.py !}
    ```

    Run your sample code.
    
    ```bash
    $ python3 app.py
    ```

### Example response

```json
{!> code-samples/ai/punctuate-response.json !}
```

