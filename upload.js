import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// ✅ Replace these with your real values
const R2_ACCOUNT_ID = "ffc2e4220189c8652dd5a9d1aa442da3";
const R2_ACCESS_KEY_ID = "24f9ae67c9ea90f7171ab704d2c174d6";
const R2_SECRET_ACCESS_KEY = "347b6ec9c17f0a496f6c1b743a542409fc001a9b8dc6e5eed1dadb8d355fb150";
const R2_BUCKET_NAME = "bls";

// ✅ R2 endpoint
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

const client = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY
  }
});

async function upload(filePath, objectKey) {
  console.log(`Reading local file: ${filePath}`);

  const body = fs.readFileSync(filePath);

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: objectKey,
    Body: body,
    ContentType: "text/csv"
  });

  console.log(`Uploading to R2 as: ${objectKey}`);

  const result = await client.send(command);

  console.log("Upload complete.");
  console.log("R2 response:", result);
}

upload("CpiReleaseSchedule2026.csv", "CpiReleaseSchedule2026.csv")
  .catch(err => {
    console.error("Upload failed:", err);
  });