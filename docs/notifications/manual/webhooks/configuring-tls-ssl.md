# Configuring TLS / SSL

A properly secured webhook is needed in to receive RingCentral webhook events with production data. Once TLS is configured, you can [create your production environment webhook](../../webhooks/).

This guide provides some quick information on how to configure TLS / SSL on a webserver and includes the following ssections:

1. Creating a Key Pair and Requesting a TLS / SSL Server Certificate
1. Installing the certificate in a server

This tutorial will use [Let's Encrypt](https://letsencrypt.org/) for certificates. Other Certificate Authorities will have their own ways to process Certificate Signing Requests (CSRs) and return Certificates, such as using [PKCS #10 CSRs](https://decoder.link/csr_generator).

## Creating a Key Pair and Requesting a TLS / SSL Server Certificate

When using Let's Encrypt, there are a number of ways to create a certificate and key pair which can be done with any [ACME protocol compliant client](https://letsencrypt.org/docs/client-options/).

> Terminology: The key pair is the asymmetric cryptographic security devices used in the TLS protocol, consisting of a private key and a public key. The certificate is a cryptographically signed document by a Certificate Authority that attests to the ownership of the private key.

Many AMCE clients make the job of retrieving and renewing certificates painless. For this tutorial we will show the manual approach using the popular [EFF Certbot](https://certbot.eff.org/) client since it is the mostly broadly applicable. We will follow this by showing an automated approach to demonstrate how easy this can be.

### Manual Approach

To create a key pair and certificate manually, there are 3 steps:

#### 1) Create the key pair and request the certificate

The following command will promopt you to create a file on a server you control.

`$ certbot certonly --manual --preferred-challenges http -d {mysite.com}`

#### 2) Add a challenge file to the server

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Create a file containing just this data:

hm-Fjvqk7U37Nw2SMyKfAD_CE8sDsGrHczJmvUkzuxI.ReoGCSKTofBLRj97vINiQ8jZ39IMLvSmKhaXulMzA0I

And make it available on your web server at this URL:

http://mysite.com/.well-known/acme-challenge/hh-Fjzqk7V37Nw2SLyKfZD_CE8sDsQrHczVovUkzuxI

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

After you create that file, `certbot` will create two files:

```
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/mysite.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/mysite.com/privkey.pem
```

#### 3) Install the certificates

Use the following configurations to install your key and certificate in your webserver. For Let's Encrypt, you will receive two certificates, one for your server and another for the Let's Encrypt Intermediatee CA. Both of these need to be provided by your server.

=== "Apache"
	```http
	SSLEngine on
	SSLProtocol -all +TLSv1.2 +TLSv1.3
	SSLCertificateFile /etc/letsencrypt/live/mysite.com/fullchain.pem
	SSLCertificateKeyFile /etc/letsencrypt/live/mysite.com/privkey.pem
	```

* Note: In Apache 2.4.8 and above, Apache will handle both the server certificate and the intermedidiate CA certificate(s) in the `SSLCertificateFile` directive. Below 2.4.8, a separate directive is needed for the intermediate CA, the `SSLCertificateChainFile` directive. Other web servers may have similar requirements.

### Automatic Approach

With Let's Encrypt, there are also ways to fully automate the process for certificate management.

For example, [CertMagic](https://github.com/caddyserver/certmagic) for Go implements the [AMCE Protocol](https://tools.ietf.org/html/rfc8555) and handles the entire process requesting, loading, and renewing certificates transparently. You just need to start your HTTPS server using it with a single line.

=== "Go"
	```go
	import "github.com/caddyserver/certmagic"

	// Replace the following:
	// http.ListenAndServe(":80", mux)

	// with encrypted HTTPS with HTTP->HTTPS redirects 🔒😍
	certmagic.HTTPS([]string{"example.com"}, mux)
	```

## Checking Certificate Status

Your certificate must be valid according to your Certificate Authority. The Online Certificate Status Protocol (OCSP) ([IETF RFC-6960](https://tools.ietf.org/html/rfc6960)) is used for checking certificate validity. There are a variety of ways to check status based on implementations of this protocol.

An easy manual way to check is to use the following web page where you can paste a PEM-encoded certificate.

[https://decoder.link/ocsp](https://decoder.link/ocsp)

An easy manual way to get a server's PEM encoded certificate is to use the Firefox browser's cert viewer'ss linkss for downloading the PEM certificate and chain.

## Troubleshooting

### SUB-524: HTTPS certificate is not valid

Of note, it is important that your server send the Intermediate CA certificates. If your server has a valid Server Certificate but doesn't send the required Intermediate CA certificates, the RingCentral service will not be able to follow the chain to a valid Root CA certificate. If intermediate certificates are missing, you will receive a Status `400` Error Code `SUB-524` response like the following.

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=utf-8

{
  "errorCode":"SUB-524",
  "message":"HTTPS certificate is not valid",
  "errors":[
    {
      "errorCode":"SUB-524",
      "message":"HTTPS certificate is not valid"
    }
  ]
}
```
