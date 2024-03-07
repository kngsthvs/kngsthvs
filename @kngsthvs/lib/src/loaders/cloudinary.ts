/**
 * @see https://nextjs.org/docs/app/api-reference/next-config-js/images#cloudinary
 * @see https://cloudinary.com/documentation/transformation_reference
 * @see https://cloudinary.com/documentation/image_transformations
 */

export function cloudinaryLoader({
  quality,
  src,
  width,
}: {
  quality?: number;
  src: string;
  width: number;
}) {
  const array = src.split("/image/upload/");
  const params = ["c_fill", "f_webp", `w_${width}`, `q_${quality || "auto"}`];

  return `${array[0]}/image/upload/${params.join(",")}/${array[1]}`;
}
