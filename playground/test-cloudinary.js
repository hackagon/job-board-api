const cloudinary = require('cloudinary')
const path = require('path')

cloudinary.v2.config({
  cloud_name: 'dfkfifms8',
  api_key: '588881372973594',
  api_secret: '-wcraCxHllL2GIRuNxe1lxF8OEo'
});

const filePath = path.join(__dirname, 'hackagon.jpeg')
console.log(filePath)

cloudinary.v2.uploader
  .upload(filePath,
    {
      // resource_type: "video",
      public_id: "test/logo",
      // overwrite: true,
      // notification_url: "https://mysite.example.com/notify_endpoint"
    })
  .then(result => console.log(result))
  .catch(console.log)