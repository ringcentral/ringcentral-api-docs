# Resource identification

The table below describes properties which are supported by almost all API resources and used for identification purposes.

| Parameter | Type       | Description |
| --------- | ---------- | ----------- |
| `id`      | string     | Internal unique identifier of a resource. This property exists in all resources which support retrieval/update/delete of a single record of particular type. Depending on a resource it can hold either an integer or a string value. The resource ID is also passed as a path parameter in the URI |
| `uri`     | URI string | Canonical URI of a resource. This URI might not be the same as the one which was used to retrieve this resource information. For example, if a resource was accessed by the URI containing simplified syntax with the tilde (~) characters, the canonical URI will also contain real identifiers. In most cases the URI contains an ID value embedded as a path parameter |

The similar convention is used when one resource refers to another. For example, a direct phone number returned by the API contains a link to the extension it is assigned to in the following property:

```json
"extension":
    {
        "id": 234244008,
        "uri": ".../account/405884008/extension/234244008"
    }
```

