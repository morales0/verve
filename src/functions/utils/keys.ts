export const encodeKey = (key: string) => key.replaceAll(".", "_");
export const decodeKey = (key: string) => key.replaceAll("_", ".");
