!!! tldr "JWT versus Password-based authentication"

    RingCentral strongly recommends that developers utilize JWT for server-to-server authentication, as password-based authentication is considered less-secure. In addition, JWT authentication is compatible with far more applications. The table below describes the differences between these two authentication methods. 

    | | Password-based | JWT-based |
    |-|-|-|
    | Persistent and immutable | No | Yes |
    | Compatible with accounts configured for Single Sign-on? | No | Yes |
    | Compatible with private apps? | Yes | Yes |
    | Compatible with public apps? | No | Yes |    