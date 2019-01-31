no_breadcrumb:true

# Contributing Guide

We encourage contributions from our community to help us provide the best possible documentation to our fellow developer community. 

## Styles

### Code Blocks

Single code blocks can used for syntax highlighting.

```php
<?php 
printf("HELLO WORLD!");
?>
```

You can also turn line numbers on and off, and highlight line numbers:

```php hl_lines="3" linenums="1"
<?php 
a = 10;
printf("Look at me!");
b = 20;
?>
```

### Tabbed Code Blocks

Multiple code blocks in a row will automatically be grouped into a set of tabs. This utilizes the [superfences](https://facelessuser.github.io/pymdown-extensions/extensions/superfences/) markdown extension.

```c tab=
printf("HELLO WORLD!");
```

```java tab=
System.out.println("HELLO WORLD!");
```

```python tab=
print("HELLO WORLD!")
```

## Call Outs

The [admonitions markdown extension](https://squidfunk.github.io/mkdocs-material/extensions/admonition/) allows for the creation of an array of call outs.

* note

    !!! note "Phasellus posuere in sem ut cursus"

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.

* info

    !!! info "Phasellus posuere in sem ut cursus"

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.

* danger

    !!! danger "Phasellus posuere in sem ut cursus"

    	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.

* bug

    !!! bug "Phasellus posuere in sem ut cursus"

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.

* hint

    !!! hint "Phasellus posuere in sem ut cursus"

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.

* check

    !!! check "Phasellus posuere in sem ut cursus"

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.

* tldr

    !!! tldr "Phasellus posuere in sem ut cursus"

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.

* warning

    !!! warning "Phasellus posuere in sem ut cursus"

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.

* fail

    !!! fail "Phasellus posuere in sem ut cursus"

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.

* example

    !!! example "Phasellus posuere in sem ut cursus"

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.

* cite

    !!! cite "Phasellus posuere in sem ut cursus"

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.

### Collapsable Call Outs

??? example "Show Detailed Instructions"
    
    1. [Login or create an account](https://developer.ringcentral.com/login.html#/) if you have not done so already.
    2. Go to Console/Apps and click 'Create App' button.
    3. Give your app a name and description, then click Next.
    4. On the second page of the create app wizard enter the following:
         * Select 'Private' for Application Type.
         * Select 'Server-only (No UI)' for Platform Type.
    5. On the third page of the create app wizard, select the following permissions:
         * RingOut
    6. We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.

