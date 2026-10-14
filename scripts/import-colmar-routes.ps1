$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$routes = @(
  @{ File = 'colmar-day-2023'; Tour = 'fr-0027'; Label = 'Daytime'; Source = 'https://www.google.com/maps/d/viewer?mid=1ThIBZmv2HMJhvMrs8Q7U5A-LjW4Mc9c' },
  @{ File = 'colmar-evening-2023'; Tour = 'fr-0026'; Label = 'Evening'; Source = 'https://www.google.com/maps/d/viewer?mid=1VbWklQNfAGYODKpJHmPtOTuPM6JPqiM' }
)
function Read-Coordinates($text) {
  @($text.Trim() -split '\s+' | ForEach-Object {
    $parts = $_ -split ','
    $lng = [double]::Parse($parts[0], [cultureinfo]::InvariantCulture)
    $lat = [double]::Parse($parts[1], [cultureinfo]::InvariantCulture)
    if ($lng -lt 7.34 -or $lng -gt 7.38 -or $lat -lt 48.06 -or $lat -gt 48.09) { throw 'Coordinate outside Colmar old town' }
    ,@($lng, $lat)
  })
}
$result = @(foreach ($route in $routes) {
  $xml = [System.Xml.XmlDocument]::new()
  $xml.XmlResolver = $null
  $xml.Load((Join-Path $projectRoot ('docs/christmas-markets/routes/' + $route.File + '.kml')))
  $lines = $xml.SelectNodes('//*[local-name()="LineString"]/*[local-name()="coordinates"]')
  if ($lines.Count -ne 1) { throw 'Expected one route line' }
  $points = @(foreach ($point in $xml.SelectNodes('//*[local-name()="Placemark"][*[local-name()="Point"]]')) {
    $coordinates = @(Read-Coordinates $point.SelectSingleNode('*[local-name()="Point"]/*[local-name()="coordinates"]').InnerText)
    @{ name = $point.SelectSingleNode('*[local-name()="name"]').InnerText.Trim(); coordinates = $coordinates[0] }
  })
  @{ tourId = $route.Tour; label = $route.Label; year = 2023; sourceUrl = $route.Source; coordinates = @(Read-Coordinates $lines[0].InnerText); points = $points }
})
$json = ConvertTo-Json -InputObject $result -Depth 8 -Compress
$output = "// Generated from the owner's cached public KML exports. Run scripts/import-colmar-routes.ps1.`nimport type { GuideMapRoute } from '../guides/map-types';`nexport const colmarRoutes: GuideMapRoute[] = $json;`n"
[System.IO.File]::WriteAllText((Join-Path $projectRoot 'lib/christmas/colmar-routes.ts'), $output, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Imported the two Colmar route lines and original place markers.'
