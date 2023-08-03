// utils/imageUtils.js
const sharp = require('sharp');
const ExifParser = require('exif-parser');

async function getPPI(imagePath) {
  try {
    const imageBuffer = await sharp(imagePath).toBuffer();
    const exifData = ExifParser.create(imageBuffer).parse();
    const resolutionUnit = exifData.tags.XResolutionUnit;
    const ppi = resolutionUnit === 2 ? exifData.tags.XResolution : null;
    return ppi;
  } catch (error) {
    console.error('Error while calculating PPI:', error);
    return null;
  }
}

module.exports = {
  getPPI,
};
