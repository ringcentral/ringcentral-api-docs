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

### Code Fences

Multiple code blocks in a row will automatically be grouped into a set of tabs.

```c tab=
printf("HELLO WORLD!");
```

```java tab=
System.out.println("HELLO WORLD!");
```

```python tab=
print("HELLO WORLD!")
```

## Admonitions

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


