# RingCentral Developer Guide Documentation

This repository is the home of the RingCentral Developer Guide: a collection of materials, and documentation to help educate developers on how to build on top of the RingCentral platform.

This repository powers the production of two key resources:

1. [RingCentral Developer Guide](https://ringcentral-api-docs.readthedocs.io/en/latest/oauth/)
2. [RingCentral Tutorials Index](https://ringcentral.github.io/tutorials/)

## Inside this Repository

RingCentral's [Developer Guide](https://ringcentral-api-docs.readthedocs.io/en/latest/) is powered by [Read the Docs](https://readthedocs.org/), and makes up the bulk of this repository. To contribute to this documentation effort, start by looking at `mydocs.yml` which powers the generation of the table of contents and points to the specific documents located within the `docs` directory.

RingCentral's [Tutorials](https://ringcentral.github.io/tutorials/) index aggregates content found here, as well as content across the web. It is powered by `tutorials.json`.

## Contributing

If you would like to contribute to the RingCentral documentation effort, fork this repository, make your desired edits and contributions, and issue a pull request accordingly.

### Running ReadTheDocs Locally

```
$ git clone https://github.com/ringcentral/ringcentral-api-docs.git
$ cd ringcentral-api-docs
% pip install mkdocs
% pip install mkdocs-ringcentral
% mkdocs serve
```

Then you should be able to load http://localhost:8000 to view the documentation.