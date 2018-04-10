import roundToDecimals from './roundToDecimals';

/**
 * Creates binary blob from a string of base64-encoded data
 * @param {string} base64Encoded data to be converted to blob
 * @param {object} options additional params to pass to Blob (file type etc)
 * @returns {Blob}
 */
export const base64ToBlob = (base64Encoded, options) => {
  const binary = atob(
      base64Encoded.slice(
        base64Encoded.indexOf('base64') + 7,
        base64Encoded.length
      )
    ),
    length = binary.length;

  const ab = new ArrayBuffer(length),
    ua = new Uint8Array(ab);

  for (let i = 0; i < length; i++) {
    ua[i] = binary.charCodeAt(i);
  }

  return new Blob([ua], options || {});
};

/**
 * Transforms a string of base64-encoded data into a structure that can be uploaded programmatically, renamed etc.
 * We can not use {File} as IE does not support its constructor.
 * @param {string} base64Encoded
 * @param {object} blobOptions
 * @param {string} name
 * @returns {Blob}
 */
export const base64ToFileLike = (base64Encoded, blobOptions, name) => {
  const fileLikeStructure = base64ToBlob( base64Encoded, blobOptions );

  fileLikeStructure.name = name;

  return fileLikeStructure;
};

export function fileToBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB'];
const kilobyte = 1024;

/**
 * Returns a human-readable size
 * @param bytes
 * @param decimals
 * @return {string}
 */
export function getFileSizeReadable (bytes, decimals = 2) {
  if (bytes === 0) return `0 ${sizes[0]}`;

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(kilobyte)));

  return `${roundToDecimals(bytes / (kilobyte**i), decimals)} ${sizes[i]}`;
}
