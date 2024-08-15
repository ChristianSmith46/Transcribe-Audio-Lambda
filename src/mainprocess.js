const { transcriptionService } = require("./services/transcribeService");

module.exports.generateTranscription = async (bucket, key) => {
    try {
        const transcriptionData = await transcriptionService(bucket, key);
        if (transcriptionData.TranscriptionJobStatus === "FAILED") {
            return {
                error: true,
                message: "Transcription job failed",
            };
        }

        return {
            error: false,
            message: "Transcription job started",
        };
    } catch (error) {
        console.error("Error: ", error);
        return {
            error: true,
            message: "Error occurred while generating transcription file",
        };
    }
}