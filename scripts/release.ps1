param(
  [Parameter(Mandatory=$true)][string]$version
)

gh release create v$version --generate-notes
bun run npm $version
cd npm
npm publish --access public
cd..