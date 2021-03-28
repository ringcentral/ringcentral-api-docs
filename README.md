# RingCentral Developer Guide Documentation

[![Build Status][specs-status-svg]][specs-status-url]
[![Docs Status][docs-status-svg]][docs-status-url]
[![Docs][docs-svg]][docs-url]

 [specs-status-svg]: https://github.com/ringcentral/ringcentral-api-docs/workflows/spec%20build/badge.svg?branch=master
 [specs-status-url]: https://github.com/ringcentral/ringcentral-api-docs/actions

This repository is the home of the RingCentral Developer Guide: a collection of materials, and documentation to help educate developers on how to build on top of the RingCentral platform.

This repository powers the production of two key resources:

1. [RingCentral Developer Guide](https://ringcentral-api-docs.readthedocs.io/en/latest/oauth/)
2. [RingCentral Tutorials Index](https://ringcentral.github.io/tutorials/)

## Inside this Repository

RingCentral's [Developer Guide](https://ringcentral-api-docs.readthedocs.io/en/latest/) is powered by [Read the Docs](https://readthedocs.org/), and makes up the bulk of this repository. To contribute to this documentation effort, start by looking at `mydocs.yml` which powers the generation of the table of contents and points to the specific documents located within the `docs` directory.

RingCentral's [Tutorials](https://ringcentral.github.io/tutorials/) index aggregates content found here, as well as content across the web. It is powered by `tutorials.json`.

## Contributing

If you would like to contribute to the RingCentral documentation effort, fork this repository, make your desired edits and contributions, and issue a pull request accordingly.

### Running the Developer Guide Locally

The Developer Guide is built on top of Mkdocs, a self-contained documentation server. Writers are encourages to install Mkdocs locally so that you can edit files and preview your changes before they are pushed to production servers. 

```
$ git clone https://github.com/ringcentral/ringcentral-api-docs.git
$ cd ringcentral-api-docs
$ pip install mkdocs
$ pip install mkdocs-ringcentral
$ mkdocs serve
```

Then you should be able to load http://localhost:8000 to view the documentation.

Please be aware that the local version of the Developer Guide utilizes a Mkdocs theme that *mimics* our main documentation site, but it is not the same -- hence some of the visual differences you may observe. When the Developer Guide is published officially, mkdocs is used to generate HTML files, and those HTML files are then loaded into a different presentation framework. 

## Tips for Styling Documentation

### View our styleguide

Our [styleguide](https://github.com/ringcentral/ringcentral-api-docs/blob/master/docs/styleguide.md) serves as a reference for the various documentaton syntaxes to help writers format their documentation and utilize markdown to its fullest extent. The styleguide demonstrates the following styles:

* Fenced Code Blocks
* Admonitions, or call outs
* Tables
* Syntax highlighting and line highlighting

### Customizing the underlying theme and HTML

For local development, mkdocs uses a [RingCentral Mkdocs Theme](https://github.com/byrnereese/mkdocs-ringcentral). If you wish to affect the underlying structure of the site you have two choices:

* Override locally
* Fix globally

To override locally, consult the mkdocs documentation on creating a [custom theme](https://www.mkdocs.org/user-guide/custom-themes/). The process involves overriding theme files with your own custom files. This requires you understand the underlying theme structure, so consult the structure of [mkdocs-ringcentral](https://github.com/byrnereese/mkdocs-ringcentral).

To make a change globally, you can also submit a pull request to [mkdocs-ringcentral](https://github.com/byrnereese/mkdocs-ringcentral) and the change can be propogated across all documentation projects that utilize it.

### Utilizing components from Bootstrap

Our documentation is all based on the open-source CSS framework called Bootstrap. It makes available a number of commonly used UI components that can be cut and paste into our docs and be rendered faithfully.

* Visit the [Bootstrap Component Library](https://getbootstrap.com/docs/4.4/components/alerts/) to learn more

### Using the Material component library

Our documentation also makes use of the [Mkdocs Material Plugin](https://squidfunk.github.io/mkdocs-material/). This plugin is what renders admonitions for example.

```
!!! note "Phasellus posuere in sem ut cursus"
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod.
```

This plugin extends the markdown language new ways of encoding text in markdown, including:

* [admonitions](https://squidfunk.github.io/mkdocs-material/extensions/admonition/)
* [footnotes/citations](https://squidfunk.github.io/mkdocs-material/extensions/footnotes/)
* [HTML meta tags](https://squidfunk.github.io/mkdocs-material/extensions/metadata/)

There are a number of [other Markdown extensions](https://squidfunk.github.io/mkdocs-material/extensions/pymdown/) available through Material as well.

### Embedding Code Samples in documentation

Inside of this repository is a `code-samples` directory, into which is placed all the code samples that can be found in our documentation. Each code sample stored here is a fully functional, stand-alone script that can be run directly by a developer.

Writers can then include content from a code sample using the following syntax:

     ```javascript
     {! code-samples/path/to/code-sample.js [ln:35-48] !}
     ```

The above example includes the file referenced, but only lines 35 through 48. This makes it possible to only include fragments of a code sample, while maintaining the integrity of the code sample's ability to be run as a stand-alone script.

This include functionality is provided by the [mdx_include extension](https://github.com/neurobin/mdx_include). Consult its documentation to learn how to use it more effectively.
