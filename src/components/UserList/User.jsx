const sharp = require('sharp');
const formats = ['heic', 'heif', 'avif', 'jpeg', 'jpg', 'jpe', 'tile', 'dz', 'png', 'raw', 'tiff', 'tif', 'webp', 'gif', 'jp2', 'jpx', 'j2k', 'j2c', 'jxl'];

// Path to your JPEG file
const imagePath = '/Volumes/dev/petjapp/resources/IMG_0277.jpeg';
const format = 'png';

// Reading and processing the image
const sharpImage = sharp(imagePath);


  sharpImage.resize(64, 64) // Resize the image to 300x300 pixels
  .toFormat(format)
  .toFile('/Volumes/dev/petjapp/public/images2/fx64.' + format, (err, info) => {
    if (err) throw err;
    console.log(info);
  })

sharpImage.resize(256, 256) // Resize the image to 300x300 pixels
  .toFormat(format)
  .toFile('/Volumes/dev/petjapp/public/images2/fx256.' + format, (err, info) => {
    if (err) throw err;
    console.log(info);
  })