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
 * Transforms a dataUrl to File object
 *
 * @param {string} dataUrl
 * @param {string} name
 * @returns {Blob}
 */
export const dataUrlToFile = (dataUrl, name) => {
  let arr = dataUrl.split(',');
  let type = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let size = bstr.length;
  let u8arr = new Uint8Array(size);

  while (size--){
    u8arr[size] = bstr.charCodeAt(size);
  }

  return new File([u8arr], name, { type });
};

export function fileToDataUrl (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function fileToPlainText (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
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
