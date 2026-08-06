# Development Libraries

Develop with our API libraries to get the fastest integration experience.

---

!!! warning
    Make sure you have [signed up](https://dashboard.messente.com/register) and have your [API keys](https://dashboard.messente.com/api-settings).

## Install a library

We have API libraries for various programming languages. Select your preferred programming language and follow the instructions.

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
