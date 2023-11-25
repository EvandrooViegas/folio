export default function getLocalFileURL(
  file: File | undefined
) {
  if (!file) return;
  const reader = new FileReader();
  const prom = new Promise<string | undefined>((res, rej) => {
    reader.onload = function (e) {
      res(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
  return prom;
}
