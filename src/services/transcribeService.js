const { TranscribeClient, StartTranscriptionJobCommand } = require("@aws-sdk/client-transcribe");

const transcribeClient = new TranscribeClient({ region: process.env.AWS_REGION });

module.exports.transcriptionService = async (bucket, key) => {
        const params = {
            TranscriptionJobName: key.split(".")[0],
            LanguageCode: "en-US",
            MediaFormat: "mp3",
            Media: {
                MediaFileUri: `https://${bucket}.s3.amazonaws.com/${key}`,
            },
            Subtitles: {
                Formats: ["srt"],
            },
            OutputBucketName: bucket,
        };
        console.log("Transcription Job Params: ", params);
        const command = new StartTranscriptionJobCommand(params);

        const response = await transcribeClient.send(command);
        console.log("Transcription Job Started: ", response);
        return response.TranscriptionJob;
}