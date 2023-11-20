type Options = {
  type: string,
  extension: string
}
export default function getLocalFileFromURL(url: string, options: Options) {
  const { extension, type } = options
  const filename = `file-${Math.random()}.${extension}`;
  const base64Data = url.split(",")[1];

  // Convert base64 to binary
  const binaryData = atob(base64Data);

  // Create ArrayBuffer
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    view[i] = binaryData.charCodeAt(i);
  }

  // Create Blob from ArrayBuffer
  const blob = new Blob([arrayBuffer], { type });

  // Optionally, create a File object with a filename
  const file = new File([blob], filename, { type: blob.type });

  return file;
}
