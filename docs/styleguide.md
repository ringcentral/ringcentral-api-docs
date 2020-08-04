# Writing for the RingCentral Developer Guide

## Headers

### The 3rd level

#### The 4th level

##### The 5th level

###### The 6th level

## Blockquotes

> Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet rutrum.
  Pellentesque aliquet quam enim, eu volutpat urna rutrum a. Nam vehicula nunc
  mauris, a ultricies libero efficitur sed. *Class aptent* taciti sociosqu ad
  litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie
  imperdiet consectetur.

### Blockquote nesting

> **Sed aliquet**, neque at rutrum mollis, neque nisi tincidunt nibh, vitae
  faucibus lacus nunc at lacus. Nunc scelerisque, quam id cursus sodales, lorem
  [libero fermentum](#) urna, ut efficitur elit ligula et nunc.

> > Mauris dictum mi lacus, sit amet pellentesque urna vehicula fringilla.
    Ut sit amet placerat ante. Proin sed elementum nulla. Nunc vitae sem odio.
    Suspendisse ac eros arcu. Vivamus orci erat, volutpat a tempor et, rutrum.
    eu odio.

> > > `Suspendisse rutrum facilisis risus`, eu posuere neque commodo a.
      Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed nec leo
      bibendum, sodales mauris ut, tincidunt massa.

### Other content blocks

> Vestibulum vitae orci quis ante viverra ultricies ut eget turpis. Sed eu
  lectus dapibus, eleifend nulla varius, lobortis turpis. In ac hendrerit nisl,
  sit amet laoreet nibh.
  ``` js hl_lines="8"
  var _extends = function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  };
  ```

  > > Praesent at `:::js return target`, sodales nibh vel, tempor felis. Fusce
      vel lacinia lacus. Suspendisse rhoncus nunc non nisi iaculis ultrices.
      Donec consectetur mauris non neque imperdiet, eget volutpat libero.

## Lists

### Unordered lists

* Sed sagittis eleifend rutrum. Donec vitae suscipit est. Nullam tempus tellus
  non sem sollicitudin, quis rutrum leo facilisis. Nulla tempor lobortis orci,
  at elementum urna sodales vitae. In in vehicula nulla, quis ornare libero.

    * Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
    * Nam vulputate tincidunt fringilla.
    * Nullam dignissim ultrices urna non auctor.

* Aliquam metus eros, pretium sed nulla venenatis, faucibus auctor ex. Proin ut
  eros sed sapien ullamcorper consequat. Nunc ligula ante, fringilla at aliquam
  ac, aliquet sed mauris.

* Nulla et rhoncus turpis. Mauris ultricies elementum leo. Duis efficitur
  accumsan nibh eu mattis. Vivamus tempus velit eros, porttitor placerat nibh
  lacinia sed. Aenean in finibus diam.

### Ordered lists

1. Integer vehicula feugiat magna, a mollis tellus. Nam mollis ex ante, quis
  elementum eros tempor rutrum. Aenean efficitur lobortis lacinia. Nulla
  consectetur feugiat sodales.

2. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
  ridiculus mus. Aliquam ornare feugiat quam et egestas. Nunc id erat et quam
  pellentesque lacinia eu vel odio.

    1. Vivamus venenatis porttitor tortor sit amet rutrum. Pellentesque aliquet
      quam enim, eu volutpat urna rutrum a. Nam vehicula nunc mauris, a
      ultricies libero efficitur sed.

        1. Mauris dictum mi lacus
        2. Ut sit amet placerat ante
        3. Suspendisse ac eros arcu

    2. Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet
      rutrum. Pellentesque aliquet quam enim, eu volutpat urna rutrum a. Sed
      aliquet, neque at rutrum mollis, neque nisi tincidunt nibh.

    3. Pellentesque eget `:::js var _extends` ornare tellus, ut gravida mi.
    ``` js hl_lines="1"
    var _extends = function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target;
    };
    ```

3. Vivamus id mi enim. Integer id turpis sapien. Ut condimentum lobortis
  sagittis. Aliquam purus tellus, faucibus eget urna at, iaculis venenatis
  nulla. Vivamus a pharetra leo.

## Code blocks

### Inline

Morbi eget `dapibus felis`. Vivamus *`venenatis porttitor`* tortor sit amet
rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
per inceptos himenaeos. [`Pellentesque aliquet quam enim`](#), eu volutpat urna
rutrum a.

Nam vehicula nunc `:::js return target` mauris, a ultricies libero efficitur
sed. Sed molestie imperdiet consectetur. Vivamus a pharetra leo. Pellentesque
eget ornare tellus, ut gravida mi. Fusce vel lacinia lacus.

### Listing

    #!js hl_lines="8"
    var _extends = function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target;
    };

## Horizontal rules

Aenean in finibus diam. Duis mollis est eget nibh volutpat, fermentum aliquet
dui mollis. Nam vulputate tincidunt fringilla. Nullam dignissim ultrices urna
non auctor.

***

Integer vehicula feugiat magna, a mollis tellus. Nam mollis ex ante, quis
elementum eros tempor rutrum. Aenean efficitur lobortis lacinia. Nulla
consectetur feugiat sodales.

## Data tables

RingCentral documentation utilizes the [Bootstrap tables plugin](https://github.com/byrnereese/mkdocs-bootstrap-tables-plugin) to convert regular markdown tables into Bootstrap tables. 

| Sollicitudo / Pellentesi | consectetur | adipiscing | elit    | arcu | sed |
| ------------------------ | ----------- | ---------- | ------- | ---- | --- |
| Vivamus a pharetra       | yes         | yes        | yes     | yes  | yes |
| Ornare viverra ex        | yes         | yes        | yes     | yes  | yes |
| Mauris a ullamcorper     | yes         | yes        | partial | yes  | yes |
| Nullam urna elit         | yes         | yes        | yes     | yes  | yes |
| Malesuada eget finibus   | yes         | yes        | yes     | yes  | yes |
| Ullamcorper              | yes         | yes        | yes     | yes  | yes |
| Vestibulum sodales       | yes         | -          | yes     | -    | yes |
| Pulvinar nisl            | yes         | yes        | yes     | -    | -   |
| Pharetra aliquet est     | yes         | yes        | yes     | yes  | yes |
| Sed suscipit             | yes         | yes        | yes     | yes  | yes |
| Orci non pretium         | yes         | partial    | -       | -    | -   |

Sed sagittis eleifend rutrum. Donec vitae suscipit est. Nullam tempus tellus
non sem sollicitudin, quis rutrum leo facilisis. Nulla tempor lobortis orci,
at elementum urna sodales vitae. In in vehicula nulla, quis ornare libero.

| Left       | Center   | Right   |
| :--------- | :------: | ------: |
| Lorem      | *dolor*  | `amet`  |
| [ipsum](#) | **sit**  |         |

Vestibulum vitae orci quis ante viverra ultricies ut eget turpis. Sed eu
lectus dapibus, eleifend nulla varius, lobortis turpis. In ac hendrerit nisl,
sit amet laoreet nibh.

<table>
  <colgroup>
    <col width="30%">
    <col width="70%">
  </colgroup>
  <thead>
    <tr class="header">
      <th>Table</th>
      <th>with colgroups (Pandoc)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Lorem</td>
      <td>ipsum dolor sit amet.</td>
    </tr>
    <tr>
      <td>Sed sagittis</td>
      <td>eleifend rutrum. Donec vitae suscipit est.</td>
    </tr>
  </tbody>
</table>

## Keys

Use the [Keys extension](https://facelessuser.github.io/pymdown-extensions/extensions/keys/) to create "keys." Do not press the button:

++ctrl+alt+delete++

## Call Outs, a.k.a. "Admonitions"

Call outs, or "admonitions," can be used to call special attention to important details or facets. They can optionally expand/collapse, and can even be nested. 

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

### Nested Call Outs

???+ note "Open styled details"

    ??? danger "Nested details!"
        And more content again.

## Tabs

You can create tabs using the [Tabbed Extension](https://facelessuser.github.io/pymdown-extensions/extensions/tabbed/).

=== "Tab 1"

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec rhoncus velit. Morbi ullamcorper porta erat, aliquam condimentum eros laoreet vitae. Etiam sed tellus neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet sodales lacus, quis mollis lacus. Pellentesque laoreet augue massa, vel vestibulum erat pretium non. Aenean tincidunt, lorem non feugiat mollis, ante massa vehicula elit, ac scelerisque tellus ipsum vitae tellus.

    ```python
    foo = "100"
    ```

=== "Another Tab"

    Below is a table with some text in it.

    | Column 1 | Column 2 | Column 3 |
    |-|-|-|
    | **Some text goes here** | true | This is a description of something. |
    | **Wait, there's more** | 1000 | Two rows! |

    ```php
    <?php
    $foo = "100"
    ?>
    ```

=== "Last Tab"

    Aenean sodales turpis sit amet metus efficitur ultrices. Vestibulum quis eros quis libero tempus tristique mattis non lorem. Ut interdum at quam ut lacinia. Praesent et tortor vulputate lectus rhoncus imperdiet. Etiam euismod neque vitae libero iaculis, eu gravida dolor interdum. Integer ultricies justo non enim consequat bibendum. 

    ```python
    foo = "100"
    ```

    Nullam a aliquet mauris. Aliquam erat volutpat. Etiam pellentesque est vitae sodales tincidunt. Sed viverra aliquet neque. Vivamus finibus nec felis vel gravida. Nullam fringilla, odio sit amet tincidunt facilisis, eros urna vulputate tellus, eu ultrices nulla lectus at elit. Aliquam lacus lacus, faucibus at ligula nec, scelerisque ultricies leo. Cras faucibus elit quis tellus viverra, sodales rutrum magna sodales.

    * List element 1
        * Sub-element
    * List element 2
    * List element 3

### Tabbed Code Blocks

Multiple code blocks in a row will automatically be grouped into a set of tabs with the syntax shown below. Spacing issues can occur in final results so double check all work. === "title" and then the ``` "code" ``` to complete it.

=== "C"
	```c
	printf("HELLO WORLD!");
	```

=== "Java"
	```java
	System.out.println("HELLO WORLD!");
	```

=== "Python"
	```python
	print("HELLO WORLD!")
	```
