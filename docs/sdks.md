# RingCentral Office SDKs

The following SDKs provide developers with libraries that make interfacing with RingCentral APIs easier in your language of choice. RingCentral currently provides the following official SDKs:

## Official SDKs

* [ringcentral-csharp](https://github.com/ringcentral/ringcentral.net) - .NET library
* [ringcentral-java](https://github.com/ringcentral/ringcentral-java) - Java library
* [ringcentral-js](https://github.com/ringcentral/ringcentral-js) - JavaScript library
* [ringcentral-php](https://github.com/ringcentral/ringcentral-php) - PHP library
* [ringcentral-python](https://github.com/ringcentral/ringcentral-python) - Python module
* [ringcentral-ruby](https://github.com/ringcentral/ringcentral-ruby) - Ruby gem
* [ringcentral-swift](https://github.com/ringcentral/ringcentral-swift) - iOS Swift client
* [ringcentral-web-phone](https://github.com/ringcentral/ringcentral-web-phone) - JavaScript WebRTC library

## UI Widgets

* [ringcentral-web-widget](https://github.com/ringcentral/ringcentral-web-widget) - Embeddable webphone widget
* [ringcentral-js-widgets](https://github.com/ringcentral/ringcentral-js-widgets) - React component library
* [ringcentral-web-widget-demos](https://github.com/ringcentral-tutorials/ringcentral-web-widget-demos) - Web Widget demo apps

## ChatBot Frameworks

[Chatbot framework adapters](../team-messaging/manual/frameworks) are also available to build chatbots using Glip and SMS.

??? tldr "I can't find an SDK for my preferred language..."
    If you are unable to find a client SDK, you can create one using our [Open API / Swagger 2.0 API specification](https://netstorage.ringcentral.com/dpw/api-reference/specs/rc-platform.yml?v=2019110620191017-1140) using Swagger Codegen which supports the following languages:
    
    ActionScript, Ada, Apex, Bash, C# (.net 2.0, 3.5 or later), C++ (cpprest, Qt5, Tizen), Clojure, Dart, Elixir, Elm, Eiffel, Erlang, Go, Groovy, Haskell (http-client, Servant ), Java (Jersey1.x, Jersey2.x, OkHttp, Retrofit1.x, Retrofit2.x, Feign, RestTemplate, RESTEasy, Vertx, Google API Client Library for Java, Rest-assured), Kotlin, Lua, Node.js (ES5, ES6, AngularJS with Google Closure Compiler annotations ), Objective-C, Perl, PHP, PowerShell, Python, R, Ruby, Rust (rust, rust-server), Scala (akka, http4s, swagger-async-httpclient ), Swift (2.x, 3.x, 4.x), Typescript (Angular1.x, Angular2.x, Fetch, jQuery, Node )

## Community SDKs and Sample Apps

In addition to the official RingCentral SDKs there are a number of unofficial libraries, plugins and sample apps for a range of languages built by amazing communities of active developers. The list below includes libraries and apps for the RingCentral Platform APIs and Glip, RingCentral’s messaging service.

If you’ve built your own RingCentral library, plugin, or open source app, please [get in touch](mailto:devsupport@ringcentral.com) and we’ll add it to this list.

Some of these integrations may be incomplete. Feedback and bugs should be directed to their representative authors.

### C&#35;

* [RCdotNetXDK](https://github.com/vshisterov/RCdotNetXDK) - A C# .NET client library wrapper with model classes and helpers
* [ringcentral-demos-fax-cover-page](https://github.com/grokify/ringcentral-demos-fax-cover-page/tree/master/csharp) - A custom fax cover page demo app using C#
* [ringcentral-demos-oauth](https://github.com/grokify/ringcentral-demos-oauth/tree/master/csharp-nancy) - A C# demo app using 3-legged OAuth 2.0 Authorization Code flow using Nancy

### ColdFusion

* [cf-ringcentral](https://github.com/dheighton/cf-ringcentral) - Coldfusion "wrapper" for working with the RingCentral REST API

### Go

* [beego-oauth2-demo](https://github.com/grokify/beego-oauth2-demo) - An example Beego app with OAuth2 for RingCentral in addition to Google, Facebook, etc.
* [go-ringcentral](https://github.com/grokify/go-ringcentral) - A Go client library with model structs
* [oauth2more](https://github.com/grokify/oauth2more) - A Go OAuth2 library to provide a RingCentral http.Client and SCIM user helper function.
* [ringcentral-sdk-go](https://github.com/grokify/ringcentral-sdk-go) - A Go client library and Online Account Portal CSV parser

### Java

* [ringcentral-java](https://github.com/vyshakhbabji/ringcentral-java) - A Java client library for the RingCentral REST API
* [ringcentral-call-log-record-generator-app](https://github.com/vyshakhbabji/ringcentral-call-log-record-generator-app) - A demo app to generate call log records against an account for testing purposes

### JavaScript

* [glip-plus-dist](https://github.com/tylerlong/glip-plus-dist) - A Glip app with additional features
* [glipdown](https://github.com/jstrinko/glipdown) - Glip-flavored markdown
* [Message-Dispatcher](https://github.com/anilkumarbp/Message-Dispatcher) - A Node.js app to send SMS alerts when certain numbers are dialed, e.g. for outbound 911 calls
* [rc-commander](https://github.com/tylerlong/rc-commander) - A RingCentral command line interface (CLI) app
* [ringcentral-demos-fax-cover-page](https://github.com/grokify/ringcentral-demos-fax-cover-page/tree/master/nodejs) - A custom fax cover page demo app using Node.js
* [ringcentral-demos-oauth](https://github.com/grokify/ringcentral-demos-oauth/tree/master/javascript-express) - Client and server-side JavaScript demo apps using 3-legged OAuth 2.0 Authorization Code flow
* [ringcentral-demos-webhooks](https://github.com/grokify/ringcentral-demos-webhooks/tree/master/javascript-express) - A webhooks demo app using Express.
* [ringcentral-js-concise](https://github.com/tylerlong/ringcentral-js-concise) - Concise RingCentral JavaScript SDK

### PHP

* [dokuwiki-glip](https://github.com/twinklebob/dokuwiki-glip) - A DokuWiki plugin that notifies a Glip room of wiki edits
* [oauth2-ringcentral](https://github.com/tmannherz/oauth2-ringcentral) - Support for the PHP League’s OAuth 2.0 Client
* [RingCentral-Call-Generator-Recordings-Downloader](https://github.com/anilkumarbp/RingCentral-Call-Generator-Recordings-Downloader) - An app to generate call logs and sync recordings to AWS S3 and Dropbox
* [ringcentral-demos-oauth](https://github.com/grokify/ringcentral-demos-oauth/tree/master/php) - A PHP demo app using 3-legged OAuth 2.0 Authorization Code flow
* [ringcentral-laravel](https://github.com/coxy121/ringcentral-laravel) - Laravel Package for RingCentral PHP SDK

### Python

* [ringcentral-demos-oauth](https://github.com/grokify/ringcentral-demos-oauth/tree/master/python-bottle) - A Python demo app using 3-legged OAuth 2.0 Authorization Code flow using Bottle
* [ringcentral-python](https://github.com/tylerlong/ringcentral-python) - Community maintained RingCentral Python SDK

### Ruby

* [glip-poster-ruby](https://github.com/grokify/glip-poster-ruby) - A Ruby client library for sending inbound webhooks to Glip
* [glip-rb](https://github.com/twinklebob/glip-rb) - A Glip client library for Ruby
* [lita-ringcentral](https://github.com/grokify/lita-ringcentral) - A RingCentral chatbot adapter for Lita
* [redmine_glip](https://github.com/twinklebob/redmine_glip) - Redmine plugin for Glip notifications
* [ringcentral-avatars-ruby](https://github.com/ringcentral-ruby/ringcentral-avatars-ruby) - Create default address book avatars
* [ringcentral-demos-fax-cover-page](https://github.com/grokify/ringcentral-demos-fax-cover-page/tree/master/ruby) - A custom fax cover page demo app using Ruby
* [ringcentral-demos-oauth](https://github.com/grokify/ringcentral-demos-oauth/tree/master/ruby-sinatra) - A Ruby demo app using 3-legged OAuth 2.0 Authorization Code flow using Sinatra
* [ringcentral-rss-ruby](https://github.com/ringcentral-ruby/ringcentral-rss-ruby) - Build RSS feed using Message Store API
* [ringcentral-sdk-ruby](https://github.com/grokify/ringcentral-sdk-ruby) - A RingCentral client library for Ruby

### Swift

* [glip-sdk-swift](https://github.com/grokify/glip-sdk-swift) - A Swift client library for sending inbound webhooks to Glip for iOS using Swift

### TypeScript

* [ringcentral-ts](https://github.com/zengfenfei/ringcentral-ts) - A native TypeScript client for RingCentral and Glip APIs.

### VBScript

* [ringcentral-sdk-vbs](https://github.com/grokify/ringcentral-sdk-vbs) - A sample VBScript file for sending faxes

!!! warning "Disclaimer"
    RingCentral provides the above list solely on an "as is" basis and makes no representation, warranty, assurance, guarantee or inducement of any kind with respect to the items on this list, including without limitation, any warranty of accuracy or completeness, merchantability or fitness for a particular purpose, or with respect to the non-infringement of trademarks, copyrights, patents, or any other intellectual property rights, or rights of third persons. Moreover, inclusion in the above list is not intended to imply, directly or indirectly, that these entities endorse, are endorsed by, or have any affiliation with RingCentral, and notice of any bugs or feedback should be directed to the representative author, not RingCentral.