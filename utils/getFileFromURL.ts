export async function getFileFromUrl(url: string): Promise<File | null> {
  const response = await fetch(url);
  const blob = await response.blob();
  const filename = url.split("/").pop() || "downloaded_file";
  const file = new File([blob], filename, { type: blob.type });
  return file;
}
