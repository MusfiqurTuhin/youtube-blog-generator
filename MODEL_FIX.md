# Model Name Fix - Gemini 1.5 Pro

## Issue
The application was attempting to use `gemini-3-pro` which doesn't exist in the current Gemini API.

## Root Cause
- Model name `gemini-3-pro` is not available via the Google Generative AI API
- API returned 404 error: "models/gemini-3-pro is not found for API version v1beta"

## Solution
Updated to use **Gemini 1.5 Pro** (`gemini-1.5-pro`), which is the actual available model that supports:
- ✅ YouTube video processing via `fileUri`
- ✅ Multimodal understanding (audio + visual)
- ✅ 2M token context window
- ✅ Advanced content generation

## Files Changed
1. `/src/services/gemini-service.ts` - Line 15: Changed model from `gemini-3-pro` to `gemini-1.5-pro`
2. `/src/components/YouTubeToInfographic.tsx` - Updated UI text references from "Gemini 3 Pro" to "Gemini 1.5 Pro"

## Available Gemini Models (December 2025)
- `gemini-1.5-pro` ✅ (what we're using)
- `gemini-1.5-flash`
- `gemini-2.0-flash-exp` (experimental)
- Various experimental models

## Result
Application now uses the correct model name and should successfully process YouTube videos.
