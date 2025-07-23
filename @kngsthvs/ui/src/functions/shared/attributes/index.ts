export function mapDataAttributes<T>(data: any | T): { [k: string]: any } {
  return Object.fromEntries(
    Object.entries(data).map((entry) => [`data-${entry[0]}`, entry[1]]),
  );
}
