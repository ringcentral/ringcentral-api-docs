# Overview

Follow the guide to add SMS messages to your application in minutes.

---

Sending a message using the API is a three-step process.

1. [Sign up](https://dashboard.messente.com/register) to Messente and [receive your API keys](https://dashboard.messente.com/api-settings) (no credit card required).
2. Verify your phone number as sender ID or request a [branded Sender name](sender-name.md).
3. Using the API keys, make an API request with the desired message and recipient.

!!! tip 
    Upon sign up we will add you some free credits so you can test out the service immediately. With it you can send a few test messages.

!!! warning "API key required"
    Follow this guide to send a message, once you have [received your API keys](https://dashboard.messente.com/api-settings).

## Install a library

The fastest way to get started with the API is to use our official libraries.

Select your preferred programming language and follow the instructions.

=== "Python"

    ### With PIP

    To install the API client library, simply execute:

    ```bash
    pip install messente-api
    ```

    ### Or with Setuptools

    To install the API client library, simply execute:

    ```bash
    python setup.py install --user
    ```

    then import the package:

    ```python
    import messente_api
    ```

    Take a look at the library's [GitHub](https://github.com/messente/messente-api-python) and [PyPI](https://pypi.org/project/messente-api) pages.

=== "Node"

    ### Install with npm

    ```bash
    npm i messente_api
    ```

    Take a look at the library's [GitHub](https://github.com/messente/messente-api-node) and [npm](https://www.npmjs.com/package/messente_api) pages.

=== "PHP"

    ### Install with composer

    ```bash
    composer require messente/messente-api-php
    ```

    Take a look at the library's [GitHub](https://github.com/messente/messente-api-php) and [packagist](https://packagist.org/packages/messente/messente-api-php) pages.

=== "Java"

    ### Maven users

    Allow fetching messente-api from jcenter by placing a settings.xml file to ~/.m2 maven folder containing the following:

    ```xml
    <?xml version="1.0" encoding="UTF-8" ?>
    <settings xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd"
              xmlns="http://maven.apache.org/SETTINGS/1.0.0"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <profiles>
        <profile>
          <id>bintray</id>
          <repositories>
            <repository>
              <id>central</id>
              <name>bintray</name>
              <url>https://jcenter.bintray.com</url>
              <snapshots>
                <enabled>false</enabled>
              </snapshots>
            </repository>
          </repositories>
        </profile>
      </profiles>
      <activeProfiles>
        <activeProfile>bintray</activeProfile>
      </activeProfiles>
    </settings>
    ```

    To install the API client library to your local Maven repository, add the dependency to your project's POM:

    ```xml
    <dependency>
      <groupId>com.messente.api</groupId>
      <artifactId>messente-api</artifactId>
      <version>4.2.0</version>
    </dependency>
    ```

    Now, you can install the library by running:

    ```bash
    mvn clean install
    ```

    ### Gradle users

    Add jcenter repository to your project's build file:

    ```groovy
    repositories { jcenter() }
    ```

    Also add the dependency to your project's build file:

    ```groovy
    dependencies { implementation 'com.messente.api:messente-api' }
    ```

    ### Others

    Firstly, generate the JAR by executing:

    ```bash
    mvn package -Dmaven.javadoc.skip=true
    ```

    Then manually install the following JARs:

    * target/messente-api-$VERSION_NUMBER.jar
    * target/messente-api-$VERSION_NUMBER-sources.jar
    * target/lib/*.jar

    Take a look at the library's [GitHub](https://github.com/messente/messente-api-java) and [Bintray](https://bintray.com/messente/messente-api/messente-api) pages.

=== "Ruby"

    ### Install using gem

    ```bash
    gem install messente_api
    ```

    Take a look at the library's [GitHub](https://github.com/messente/messente-api-ruby) page and [RubyGems](https://rubygems.org/gems/messente_api) pages.

=== ".NET"

    ### Install using NuGet

    ```powershell
    Install-Package com.Messente.Api
    ```

    Take a look at the library's [GitHub](https://github.com/messente/messente-api-csharp) and [NuGet](https://www.nuget.org/packages/com.Messente.Api) pages.

[Let us know if your preferred language is not in the list](https://messente.com/contact)

!!! warning
    These libraries only contain Omnichannel and Phonebook API features. For other Messente features, you need to install different set of libraries. [Libraries page](https://messente.com/documentation/tools/libraries/) contains the list of all our SDKs.

## Send a single SMS

Use the following example to send an SMS using Omnichannel API.

=== "Python"

    ```python
    {!> code-samples/messaging/global-business/send-single-sms.py !}
    ```

=== "Node"

    ```javascript
    {!> code-samples/messaging/global-business/send-single-sms.js !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/global-business/send-single-sms.php !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/global-business/send-single-sms.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/global-business/send-single-sms.rb !}
    ```

=== ".NET"

    ```csharp
    {!> code-samples/messaging/global-business/send-single-sms.cs !}
    ```

=== "cURL"

    ```bash
    {!> code-samples/messaging/global-business/send-single-sms.sh !}
    ```

[Detailed API Reference on sending an SMS](https://messente.com/documentation/messente-api/omnimessage/)

## Get delivery reports

Messente tracks your sent message and reports [status updates](delivery-report.md) back to you.

To be able to view the status, you must add a callback URL to the message. Messente will use this URL to make HTTP POST requests, if there is a status update.

Here is a code snippet for you to test it out quickly.

=== "Python"

    ```python
    {!> code-samples/messaging/global-business/get-dlr.py !}
    ```

=== "Node"

    ```javascript
    {!> code-samples/messaging/global-business/get-dlr.js !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/global-business/get-dlr.php !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/global-business/get-dlr.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/global-business/get-dlr.rb !}
    ```

=== ".NET"

    ```csharp
    {!> code-samples/messaging/global-business/get-dlr.cs !}
    ```

=== "cURL"

    ```bash
    {!> code-samples/messaging/global-business/get-dlr.sh !}
    ```

[Learn more about the delivery status](delivery-report.md)

## Send an SMS with Omnichannel API

You can also use the Omnichannel API to send an SMS message directly.

=== "Python"

    ```python
    {!> code-samples/messaging/global-business/send-fallback.py !}
    ```

=== "Node"

    ```javascript
    {!> code-samples/messaging/global-business/send-fallback.js !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/global-business/send-fallback.php !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/global-business/send-fallback.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/global-business/send-fallback.rb !}
    ```

=== ".NET"

    ```csharp
    {!> code-samples/messaging/global-business/send-fallback.cs !}
    ```

=== "cURL"

    ```bash
    {!> code-samples/messaging/global-business/send-fallback.sh !}
    ```

## Next steps

Integrating SMS to your application should never take more than a day.
Now that you have things set up it's time to get yourself a proper [sender name](sender-name.md).
