import cloudinary from 'cloudinary'
import streamifier from 'streamifier';
import config from '../../config'

cloudinary.v2.config({
  cloud_name: config.CLD_NAME,
  api_key: config.CLD_API_KEY,
  api_secret: config.CLD_SECRET_KEY
});

// upload buffer
export const uploadBuffer = async (path: string, buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream({
      folder: path
    }, (error: any, result: any) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    })

    streamifier.createReadStream(buffer).pipe(uploadStream);
  })
}

// upload file via path
export const uploadFile = async (filePath: string) => {
  return cloudinary.v2.uploader
    .upload(filePath,
      {
        // resource_type: "video",
        // public_id: "test/logo",
        // overwrite: true,
        // notification_url: "https://mysite.example.com/notify_endpoint"
      })
}