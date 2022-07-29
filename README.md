# My Awesome List

This action query the github api to get starred list of the user and then generates a list ordered by languages.

You can see an example of the output at my own [simonecorsi/awesome](https://github.com/simonecorsi/awesome)

## Table of Contents

<!-- toc -->

- [Documentation](#documentation)
  - [Requirements](#requirements)
  - [Configuration](#configuration)
    - [`api-token`](#api-token)
    - [`compact-by-topic`](#compact-by-topic)
    - [`template-path`](#template-path)
- [Example workflow](#example-workflow)

<!-- tocstop -->

## Documentation

### Requirements

- An empty repository
- A personal github api key

### Configuration

The service can be configured setting the appropriate environment variables or writing an `.env` file.

| Variable           | Description                                                         | Default                          |
| ------------------ | ------------------------------------------------------------------- | -------------------------------- |
| `api-token`        | Personal Token is used to avoid rate limit, [read more](#api-token) | `${{ secrets.API_TOKEN }}`       |
| `compact-by-topic` | Render another list in `TOPICS.md` compacted by github topics       | `'false'`                        |
| `github-name`      | Name used for the commit                                            | Github Action                    |
| `github-email`     | email used for commit                                               | actions@users.noreply.github.com |
| `template-path`    | Custom `README.md` template, [read more](#template-path)            |
| `output-filename`  | Output filename                                                     | `README.md`                      |

#### `api-token`

The Personal API Access Token is mandatory to fetch stars from the API without incurring in Rate Limits.

You'll have to generate a [personal api token](https://github.com/settings/tokens/new) and then add

#### `compact-by-topic`

If `compact-by-topic` is `'true'` it will generate another markdown file `TOPICS.md` whith all stars compacted by their github topics, be aware that this list will be bigger since data is duplicated.

#### `template-path`

If you don't like the output (default example [here](./TEMPLATE.ejs) ), you can provide your custom template that will be rendered using [EJS](https://ejs.co/) template engine.

**Path provided is relative to your current repository directory, if file is not found it will default.**

## Example workflow

```yml
name: Update awesome list

on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Awesome generator
        uses: simonecorsi/mawesome@latest
        with:
          api-token: ${{ secrets.API_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          github-email: ${{ secrets.USER_EMAIL }}
          github-name: ${{ github.repository_owner }}
```
