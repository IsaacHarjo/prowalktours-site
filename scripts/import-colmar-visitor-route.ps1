$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$xml = [System.Xml.XmlDocument]::new()
$xml.XmlResolver = $null
$xml.Load((Join-Path $projectRoot 'docs/christmas-markets/routes/colmar-visitor-walk.kml'))
function Read-VisitorCoordinates($text) {
  @($text.Trim() -split '\s+' | ForEach-Object {
    $parts = $_ -split ','
    $lng = [double]::Parse($parts[0], [cultureinfo]::InvariantCulture)
    $lat = [double]::Parse($parts[1], [cultureinfo]::InvariantCulture)
    if ($lng -lt 7.34 -or $lng -gt 7.38 -or $lat -lt 48.06 -or $lat -gt 48.09) { throw 'Coordinate outside Colmar' }
    ,@($lng, $lat)
  })
}
$lines = @(foreach ($pin in $xml.SelectNodes('//*[local-name()="Placemark"][*[local-name()="LineString"]]')) {
  @{ name = $pin.SelectSingleNode('*[local-name()="name"]').InnerText.Trim(); coordinates = @(Read-VisitorCoordinates $pin.SelectSingleNode('*[local-name()="LineString"]/*[local-name()="coordinates"]').InnerText) }
})
$points = @(foreach ($pin in $xml.SelectNodes('//*[local-name()="Placemark"][*[local-name()="Point"]]')) {
  $coordinates = @(Read-VisitorCoordinates $pin.SelectSingleNode('*[local-name()="Point"]/*[local-name()="coordinates"]').InnerText)
  @{ name = $pin.SelectSingleNode('*[local-name()="name"]').InnerText.Trim(); coordinates = $coordinates[0] }
})
if ($lines.Count -ne 2) { throw 'Expected the visitor walk and station approach; review changed KML layers before importing.' }
$result = @{ sourceUrl = 'https://www.google.com/maps/d/viewer?mid=13KTfCXf1uPAYeSSCS_CVAnVdeslAWSc'; importedOn = (Get-Date -Format 'yyyy-MM-dd'); lines = $lines; points = $points }
[IO.File]::WriteAllText((Join-Path $projectRoot 'lib/christmas/colmar-visitor-route.json'), (ConvertTo-Json -InputObject $result -Depth 8), [Text.UTF8Encoding]::new($false))
Write-Output 'Imported visitor route and station approach without changing the filmed routes.'
