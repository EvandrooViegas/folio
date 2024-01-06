export default function getLocalFileURL(
  file: File | undefined
) {
  if (!file) return;
  const reader = new FileReader();
  const prom = new Promise<string | undefined>((res, rej) => {
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      res(e.target?.result as string);
    };
  });
  return prom;
}
