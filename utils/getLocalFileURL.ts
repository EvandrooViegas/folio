export default function getLocalFileURL(
  file: File | undefined
) {
  console.log(file);
  if (!file) return;
  let url;
  const reader = new FileReader();
  const prom = new Promise<string | undefined>((res, rej) => {
    reader.onload = function (e) {
      res(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
  return prom;
}
