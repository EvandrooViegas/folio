export default function emptyValue(val: any) {
  switch (typeof val) {
    case "object":
      return Array.isArray(val) ? [] : {};
    case "string":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    default:
      return undefined;
  }
}
