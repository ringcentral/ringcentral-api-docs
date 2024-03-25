# Object representation and serialization

Whenever you need to send or retrieve a particular piece of data, for example a call log record, information on an extension, etc., the data will be embedded in the HTTP request or response body. In the majority of cases, objects will be represented using JSON and should use the `application/json` MIME type. 

## HTTP headers

The RingCentral API allows you to explicitly define a representation format by using the following HTTP headers.

### Content-type

The `Content-Type` header defines the MIME type of the request body. A content type header is always required, and must be set to `application/json` (except for the aforementioned circumstance of OAuth). 

### Content-Length

In addition to the `Content-Type` header, the `Content-Length` header is always required, and must be set to the request body in bytes.

### Accept

The `Accept` header indicates the desired MIME type of the response body. The server will return response data in this format (if possible) and will set the `Content-Type` response header accordingly. If absent, RingCentral will default to JSON as the response format. 

## Data Types

The table below describes the data types which are used in the RingCentral API. Each of the types below can also appear as an array item type for array attributes/parameters.

| Data Type                                                      | Description |
| -------------------------------------------------------------- | ----------- |
| `string`                                                       | General string value |
| `string` with `enum` qualifier                                 | Enumeration, the string that can only have one of the predefined constant values |
| `integer` (with possible `int32` or `int64` format qualifiers) | 32-bit or 64-bit integer value |
| `number` (with possible `float` or `double` format qualifiers) | Floating point number value with single or double precision |
| `boolean`                                                      | Boolean value which can be either `true` or `false`  |
| `string` with `date-time` format qualifier                     | Timestamp in XML schema-compatible format, in accordance with <a href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank">ISO 8601</a> format including timezone. |

### Example date and time formats

RingCentral servers currently process all timestamps in UTC timezone; for example, 2012-01-01T00:15:34Z. By default, servers return fully qualified datetime formats, including a decimal fraction of a second, e.g. `YYYY-MM-DDThh:mm:ss.sTZD`.

The following examples are all valid and supported formats by RingCentral.

| Description    | Format    | Example |
|----------------|-----------|---------|
| Year           | `YYYY`    | 2012    |
| Year and month | `YYYY-MM` | 2012-07 |
| Complete date | `YYYY-MM-DD` | 2012-07-16 |
| Complete date plus hours and minutes | `YYYY-MM-DDThh:mmTZD` | 2012-07-16T23:12:30 |
| Complete date plus hours, minutes and seconds | `YYYY-MM-DDThh:mm:ssTZD` | 2012-07-16T23:12:30Z or 2012-07-16T23:12:30+04:00 |
| Complete date plus hours, minutes, seconds and a decimal fraction of a second | `YYYY-MM-DDThh:mm:ss.sTZD` | 2012-07-16T23:12:30.45Z |

!!! info "The **T** appears literally in the datetime string, to indicate the beginning of the time element."

For convenience to developers, here is a quick legend:

| Format | Meaning                                                        |
|--------|----------------------------------------------------------------|
| `YYYY` | four-digit year                                                |
| `MM`   | two-digit month (01=January, etc.)                             |
| `DD`   | two-digit day of month (01 through 31)                         |
| `hh`   | two digits of hour (00 through 23) (am/pm NOT allowed)         |
| `mm`   | two digits of minute (00 through 59)                           |
| `ss`   | two digits of second (00 through 59)                           |
| `s`    | one or more digits representing a decimal fraction of a second |
| `TZD`  | time zone designator (Z or +hh:mm or -hh:mm)                   |

!!! tip "Precision when comparing datetime formats"
    Please note, that when comparing timestamps, the timestamp is truncated to a second precision. For example, the response to request where the **dateFrom** value equals to 2012-07-16T23:12:30.45Z is always identical to the one with the 'dateFrom' value 2012-07-16T23:12:30Z.
