$ErrorActionPreference = "Stop"

param(
  [int]$Port = 3001,
  [switch]$WithStripeWebhook
)

Set-Location $PSScriptRoot

if (Test-Path ".next/dev/lock") {
  Remove-Item ".next/dev/lock" -Force
}

if (-not (Test-Path "node_modules")) {
  npm install
}

if ($WithStripeWebhook) {
  $stripeCmd = Get-Command stripe -ErrorAction SilentlyContinue
  if ($null -ne $stripeCmd) {
    $webhookCmd = "stripe listen --forward-to http://localhost:$Port/api/stripe/webhook"
    Start-Process powershell -ArgumentList @("-NoExit", "-Command", $webhookCmd) | Out-Null
  } else {
    Write-Host "Stripe CLI not found. Skipping webhook forward."
  }
}

npm run dev -- --port $Port

