# My Awesome List

This action query the github api to get starred list of the user and then generates a list ordered by languages.

You can see an example of the output at my own [simonecorsi/awesome](https://github.com/simonecorsi/awesome)

## Table of Contents

<!-- toc -->

- [Documentation](#documentation)
  - [Requirements](#requirements)
  - [Configuration](#configuration)
    - [`api-token`](#api-token)
- [Example workflow](#example-workflow)

<!-- tocstop -->

## Documentation

### Requirements

- An empty repository
- A personal github api key

### Configuration

The service can be configured setting the appropriate environment variables or writing an `.env` file.

| Variable          | Description                                                          | Default                          |
| ----------------- | -------------------------------------------------------------------- | -------------------------------- |
| `api-token`       | Personal github api token.                                           | `${{ secrets.API_TOKEN }}`       |
| `github-token`    | Action Token                                                         | `${{ secrets.GITHUB_TOKEN }}`    |
| `github-name`     | Name used for the commit, default to action                          | Github Action                    |
| `github-email`    | email used for commit, default to action                             | actions@users.noreply.github.com |
| `template-path`   | Custom template path relative to your project directory (uses: [EJS](https://ejs.co/) template engine) | [TEMPLATE.ejs](./TEMPLATE.ejs)   |
| `output-filename` | Output filename                                                      | `README.md`                      |

#### `api-token`

The Personal API Access Token is mandatory to fetch stars from the API without incurring in Rate Limits.

You'll have to generate a [personal api token](https://github.com/settings/tokens/new) and then add

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
