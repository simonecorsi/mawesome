# My Awesome list

This action query the github api to get starred list of the user and then generates a list ordered by languages. 

You can see an example of the output at my own [simonecorsi/awesome](https://github.com/simonecorsi/awesome)

## Setup

To use this action you have to create your own repository (eg: `yourname/awesome`), then create a new empty action in it and then use the [example workflow](#example-workflow) below as a starting point.

## Inputs

### `github-token`

The github workflow token is mandatory 

### `api-token`

The Personal API Access Token is mandatory to fetch stars from the API without incurring in Rate Limits.

You'll have to generate a [personal api token][https://github.com/settings/tokens/new] and then add 

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
        uses: simonecorsi/mawesome@lastest
        with:
          api-token: ${{ secrets.API_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
