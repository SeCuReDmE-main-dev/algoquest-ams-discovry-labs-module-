[CmdletBinding()]
param(
    [string]$SdkRoot = (Join-Path $env:LOCALAPPDATA 'Android\Sdk')
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
$androidRoot = Join-Path $repoRoot 'android'
$gradle = Join-Path $androidRoot 'gradlew.bat'
$platformJar = Join-Path $SdkRoot 'platforms\android-36\android.jar'
$buildTools = Join-Path $SdkRoot 'build-tools\35.0.0'

if (-not (Test-Path -LiteralPath $gradle)) {
    throw "Android wrapper missing: $gradle"
}
if (-not (Test-Path -LiteralPath $platformJar)) {
    throw "Android Platform 36 is not installed. Accept the SDK licenses, then install platforms;android-36."
}
if (-not (Test-Path -LiteralPath $buildTools)) {
    throw "Android Build-Tools 35.0.0 is not installed. Accept the SDK licenses, then install build-tools;35.0.0."
}

$env:ANDROID_HOME = $SdkRoot
$env:ANDROID_SDK_ROOT = $SdkRoot

Push-Location $repoRoot
try {
    npm run mobile:sync
    if ($LASTEXITCODE -ne 0) { throw "Capacitor sync failed with exit code $LASTEXITCODE" }
} finally {
    Pop-Location
}

Push-Location $androidRoot
try {
    & $gradle assembleDebug
    if ($LASTEXITCODE -ne 0) { throw "Android build failed with exit code $LASTEXITCODE" }
} finally {
    Pop-Location
}

$apk = Join-Path $androidRoot 'app\build\outputs\apk\debug\app-debug.apk'
if (-not (Test-Path -LiteralPath $apk)) {
    throw "Gradle completed without producing the expected APK: $apk"
}

$item = Get-Item -LiteralPath $apk
$stream = [System.IO.File]::OpenRead($apk)
try {
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        $apkSha256 = ([System.BitConverter]::ToString($sha.ComputeHash($stream))).Replace('-', '').ToLowerInvariant()
    } finally {
        $sha.Dispose()
    }
} finally {
    $stream.Dispose()
}
$proof = [ordered]@{
    schema = 'securedme.education.algoquest.android-build-proof.v1'
    status = 'passed'
    apk = $item.FullName
    bytes = $item.Length
    sha256 = $apkSha256
    java = (& java --version | Select-Object -First 1).ToString()
    platform = 'android-36'
    build_tools = '35.0.0'
    generated_at = (Get-Date).ToUniversalTime().ToString('o')
}
$proof | ConvertTo-Json
