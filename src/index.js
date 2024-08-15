const { generateTranscription } = require("./mainprocess");

module.exports.handler = async (event) => {

    try {
        const bucket = event.Records[0].s3.bucket.name;
        const key = event.Records[0].s3.object.key;
        
        const transcriptionData = await generateTranscription(bucket, key);
        return transcriptionData;
        
    } catch (error) {
        console.error("Error: ", error);
        return {
            error: true,
            message: "Error occurred while generating transcription file",
        };
    }
}