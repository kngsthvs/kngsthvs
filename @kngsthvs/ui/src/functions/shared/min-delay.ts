export async function minDelay<T>(promise: Promise<T> | void, ms: number) {
  const [p] = await Promise.all([
    promise,
    new Promise<void>((resolve) => setTimeout(resolve, ms)),
  ]);

  return p;
}
