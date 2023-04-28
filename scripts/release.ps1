param(
  [Parameter(Mandatory=$true)][string]$version
)

gh release create v$version --generate-notes
deno task npm $version
cd npm
npm publish --access public
cd..