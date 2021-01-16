# mawesome

This action query the github api to get starred list of the user and then generates a list ordered by languages. 

## Inputs

### `github-token`

The github workflow token

### `api-token`

Personal API Access Token to fetch stars from the API without incurring in Rate Limits.

You'll have to set this into the secrets yourself.

## Outputs

Output the generated list in the project `README.md`

## Example usage

```yml
  uses: simonecorsi/mawesome@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    api-token: ${{ secrets.API_TOKEN }}
```
