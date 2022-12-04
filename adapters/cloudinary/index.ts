import cloudinary from 'cloudinary'
import streamifier from 'streamifier';

cloudinary.v2.config({
  cloud_name: 'dfkfifms8',
  api_key: '588881372973594',
  api_secret: '-wcraCxHllL2GIRuNxe1lxF8OEo'
});

// buffer
export const uploadImage = async (path: string, buffer: Buffer) => {
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