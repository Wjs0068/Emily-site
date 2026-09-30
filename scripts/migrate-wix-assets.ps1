$ErrorActionPreference = 'Stop'

$assets = @(
    @{ Id = 'IMG-01'; File = '01-branding-3399.jpg'; Use = 'Hero, Emily styling hair'; Url = 'https://static.wixstatic.com/media/3fb963_709d39b90be349c1aa37d0f86ad8486d~mv2.jpg' },
    @{ Id = 'IMG-02'; File = '02-branding-3944.jpg'; Use = 'Hero, bridal styling'; Url = 'https://static.wixstatic.com/media/3fb963_fc8c40a26d844778b0bc1e9b231d4feb~mv2.jpg' },
    @{ Id = 'IMG-03'; File = '03-img-1190.jpg'; Use = 'Package-section wide image'; Url = 'https://static.wixstatic.com/media/3fb963_a0d4f12785af4c7d8e7e79f993d15e6f~mv2.jpg' },
    @{ Id = 'IMG-04'; File = '04-bride-015a0371.jpg'; Use = 'Bride Spotlight / Kailey area'; Url = 'https://static.wixstatic.com/media/3fb963_5159f38dad0541e78e7b102250d7c7b5~mv2.jpg' },
    @{ Id = 'IMG-05'; File = '05-lauren.jpeg'; Use = 'Bride Spotlight / Lauren area'; Url = 'https://static.wixstatic.com/media/3fb963_324869cbcabd48f383d58b6e32d7998c~mv2.jpeg' },
    @{ Id = 'IMG-06'; File = '06-branding-2805.jpg'; Use = 'Experience section'; Url = 'https://static.wixstatic.com/media/3fb963_28140ba908254a4ba3167244642a5c35~mv2.jpg' },
    @{ Id = 'IMG-07'; File = '07-branding-3577.jpg'; Use = 'Experience section'; Url = 'https://static.wixstatic.com/media/3fb963_25ae5b33fd064a60a145821b56b29088~mv2.jpg' },
    @{ Id = 'IMG-08'; File = '08-caley-wedding.jpg'; Use = 'Caley testimonial'; Url = 'https://static.wixstatic.com/media/3fb963_1ebbc36398f444caa0c2563f5ab7d69b~mv2.jpg' },
    @{ Id = 'IMG-09'; File = '09-download-4-edited.jpg'; Use = 'Large transition/background image'; Url = 'https://static.wixstatic.com/media/3fb963_7182c646a9ed4073b22c8fbcc541943f~mv2.jpg' },
    @{ Id = 'IMG-10'; File = '10-branding-3255.jpg'; Use = 'About portrait'; Url = 'https://static.wixstatic.com/media/3fb963_27d95b16cf22489e8caf23f4bed233ee~mv2.jpg' },
    @{ Id = 'IMG-11'; File = '11-branding-3632.jpg'; Use = 'Second-style add-on'; Url = 'https://static.wixstatic.com/media/3fb963_e502622652cd4e94ae4233e2a679758e~mv2.jpg' },
    @{ Id = 'IMG-12'; File = '12-branding-4201.jpg'; Use = 'Additional-guest add-on'; Url = 'https://static.wixstatic.com/media/3fb963_c5f1b00f130a4388a7fb5bde4211433e~mv2.jpg' },
    @{ Id = 'IMG-13'; File = '13-branding-3015.jpg'; Use = 'Extension-rental add-on'; Url = 'https://static.wixstatic.com/media/3fb963_5c8ab8e23f3446e1bdcc33f07bec69d4~mv2.jpg' },
    @{ Id = 'IMG-14'; File = '14-vision-board.png'; Use = 'Fit/mood collage'; Url = 'https://static.wixstatic.com/media/3fb963_ffc29661abce42a39ce54dcd0b3d9a81~mv2.png' },
    @{ Id = 'IMG-15'; File = '15-img-1514.jpg'; Use = 'Availability/footer image'; Url = 'https://static.wixstatic.com/media/3fb963_41abcd73e7e344078b33b1a894d0f0fa~mv2.jpg' },
    @{ Id = 'IMG-16'; File = '16-og-source.jpg'; Use = 'Default Open Graph image'; Url = 'https://static.wixstatic.com/media/3fb963_31c615c9f5354e5b9bba4bfcd9502b8d~mv2.jpg' }
)

$destination = Join-Path $PSScriptRoot '..\src\assets\source'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
Add-Type -AssemblyName System.Drawing

$results = foreach ($asset in $assets) {
    $path = Join-Path $destination $asset.File

    if (-not (Test-Path $path)) {
        Invoke-WebRequest -UseBasicParsing -Uri $asset.Url -OutFile $path
    }

    $file = Get-Item $path
    $image = [System.Drawing.Image]::FromFile($file.FullName)
    $hash = (Get-FileHash -Algorithm SHA256 -Path $file.FullName).Hash.ToLowerInvariant()

    $result = [ordered]@{
        id = $asset.Id
        sourceUrl = $asset.Url
        downloadedFilename = $asset.File
        wixUse = $asset.Use
        width = $image.Width
        height = $image.Height
        bytes = $file.Length
        format = $image.RawFormat.ToString()
        sha256 = $hash
    }

    $image.Dispose()
    [pscustomobject]$result
}

$results | ConvertTo-Json -Depth 3