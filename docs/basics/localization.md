# Localization and multi-language support

There are two types of content returned by the API:
- Internal, technical content
- Content intended for display

Internal and technical content refers to facets of the RingCentral API itself: parameters, enumerations, and other API elements intended for machines to consume, not humans. This content is always in US English, and is never localized because it must remain constant so that software programs can reliably code against their values. 

Content intended for display includes things like error messages, descriptive human-readable labels for dictionary items, etc. This content is usually localized. To change the region or language this content is localized for, one can pass the preferred language (locale) code in the `Accept-Language` HTTP header. If this header is omitted, incorrect, or contains unsupported language code, the server returns localized content in the language configured in the current user's regional settings (by default, `en-US` for RingCentral US and Canada accounts, `en-GB` for RingCentral UK accounts). The actual language code is returned in the `Content-Language` HTTP header.

RingCentral API currently supports the following values in the `Accept-Language` header.

| Language                       | Locale code |
| ------------------------------ | ----------- |
| German                         | de-DE       |
| English (U.K.)                 | en-GB       |
| English (U.S.)                 | en-US       |
| Spanish                        | es-ES       |
| Spanish (Latin America)        | es-419      |
| French                         | fr-FR       |
| French (Canada)                | fr-CA       |
| Italian                        | it-IT       | 
| Dutch (Netherlands)            | nl-NL       |
| Portuguese (Brazil)            | pt-BR       |
| Portuguese (Portugal)          | pt-PT       |
| Finnish                        | fi-FI       |
| Korean (South Korea)           | ko_KR       |
| Japanese                       | ja-JP       |
| Simplified Chinese (PRC)       | zh-CN       |
| Traditional Chinese (Taiwan)   | zh-TW       |
| Traditional Chinese (Hong Kong)| zh-HK       |



