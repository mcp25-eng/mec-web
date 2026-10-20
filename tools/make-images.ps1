Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$img  = Join-Path $root 'src\static\img'
$src  = [System.Drawing.Image]::FromFile((Join-Path $img 'logo-original.png'))

function Save-Resized($size, $name) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'HighQuality'; $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'
  $g.Clear([System.Drawing.Color]::White)
  $g.DrawImage($src, 0, 0, $size, $size)
  $g.Dispose()
  $bmp.Save((Join-Path $img $name), [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}
Save-Resized 96  'logo-96.png'
Save-Resized 192 'logo-192.png'
Save-Resized 512 'logo-512.png'
Save-Resized 180 'apple-touch-icon.png'
Save-Resized 48  'favicon-48.png'
Save-Resized 32  'favicon-32.png'

$I=[string][char]0x130; $Y=[string][char]0x59; $S=[string][char]0x15E; $c=[string][char]0xE7
# Open Graph gorseli 1200x630
$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'HighQuality'; $g.InterpolationMode = 'HighQualityBicubic'; $g.TextRenderingHint = 'AntiAliasGridFit'
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$c1 = [System.Drawing.ColorTranslator]::FromHtml('#075e68')
$c2 = [System.Drawing.ColorTranslator]::FromHtml('#12b8c4')
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $c1, $c2, 35
$g.FillRectangle($brush, $rect)
$path = New-Object System.Drawing.Drawing2D.GraphicsPath; $path.AddEllipse(90,95,440,440); $g.SetClip($path); $g.DrawImage($src, 90, 95, 440, 440); $g.ResetClip()
$white = [System.Drawing.Brushes]::White
$gold  = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#f2c777'))
$f1 = New-Object System.Drawing.Font 'Segoe UI', 96, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$f2 = New-Object System.Drawing.Font 'Segoe UI', 44, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$f3 = New-Object System.Drawing.Font 'Segoe UI', 30, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('MEC', $f1, $white, 590, 170)
$g.DrawString(("SANA " + $I + $Y + $I + " GELEN`nHER " + $S + "EY"), $f2, $gold, 596, 290)
$g.DrawString(($I + 'slami i' + $c + 'erikler, ibadet rehberi, dualar'), $f3, $white, 596, 430)
$bmp.Save((Join-Path $img 'og-image.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
Write-Host 'Gorseller hazir.'
