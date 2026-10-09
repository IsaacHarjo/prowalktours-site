# Parse only the locally cached public KML exports. External XML resolution is disabled.
$routeRecords = foreach ($file in Get-ChildItem -LiteralPath docs/map-import/routes -Filter *.kml) {
  $document = [System.Xml.XmlDocument]::new()
  $document.XmlResolver = $null
  $document.Load($file.FullName)
  $markers = foreach ($place in $document.SelectNodes('//*[local-name()="Placemark"]')) {
    $point = $place.SelectSingleNode('./*[local-name()="Point"]/*[local-name()="coordinates"]')
    if ($point) {
      $coordinates = $point.InnerText.Trim().Split(',')
      [ordered]@{
        name = $place.SelectSingleNode('./*[local-name()="name"]').InnerText
        longitude = [double]::Parse($coordinates[0], [System.Globalization.CultureInfo]::InvariantCulture)
        latitude = [double]::Parse($coordinates[1], [System.Globalization.CultureInfo]::InvariantCulture)
      }
    }
  }
  [ordered]@{id=$file.BaseName; name=$document.SelectSingleNode('//*[local-name()="Document"]/*[local-name()="name"]').InnerText; points=@($markers)}
}
$routeRecords | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath docs/map-import/route-points.json -Encoding utf8
Write-Output "Parsed $($routeRecords.Count) route maps."
