# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this Lambda does

Third step of the TikTok video pipeline (see `../CLAUDE.md`). Triggered by an S3
`ObjectCreated` event when Polly drops a new `{taskId}.mp3` into the shared bucket. Starts an
Amazon Transcribe job (job name = `taskId`) against that mp3; Transcribe later writes a transcript
JSON back into the same bucket, which is what fires `Generate-Video-Lambda`.

## Commands

- `npm install` — install dependencies
- `npm run debug` (or `node debug.js`) — invoke the handler locally with the fixture in
  `data.json`, which should mimic an S3 event notification (`event.Records[0].s3.{bucket,object}`)

There is no lint config and `npm test` is a placeholder with no real tests.

## Architecture

- `src/index.js` — handler. Pulls `bucket`/`key` out of the S3 event record, delegates to
  `mainprocess.js`.
- `src/mainprocess.js` — calls `services/transcribeService.js`, checks
  `TranscriptionJobStatus !== 'FAILED'`.
- `services/transcribeService.js` — `StartTranscriptionJobCommand`: `TranscriptionJobName` is the
  mp3's key stem (i.e. the `taskId`), input media is the same bucket/key, output goes back into the
  same bucket (`OutputBucketName: bucket`), subtitle format `srt` is requested but the JSON
  transcript (with per-word timings) is what `Generate-Video-Lambda` actually consumes to build
  subtitles.

This function only *starts* the job; it does not wait for or process the transcription result.

## Environment variables

`AWS_REGION` only.
