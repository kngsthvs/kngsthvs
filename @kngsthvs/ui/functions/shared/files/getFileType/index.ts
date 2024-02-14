// /**
//  * @see https://learn.microsoft.com/en-us/DeployOffice/compat/office-file-format-reference
//  */

// import mime from "mime";
// import dynamic from "next/dynamic";
// import { type IconBaseProps } from "react-icons";

// const companies = {
//   adobe: "Adobe",
//   apache: "Apache",
//   apple: "Apple",
//   microsoft: "Microsoft",
// };

// type FileType = {
//   color?: string;
//   company?: keyof typeof companies;
//   extensions?: string | string[];
//   icon?: string;
//   Icon?: React.ComponentType<IconBaseProps>;
//   name: string;
// };

// const fileTypes: {
//   formats: FileType[];
//   icon: string;
// }[] = [
//   {
//     formats: [
//       {
//         color: "#F14A29",
//         extensions: ["htm", "html", "mht", "mhtml"],
//         name: "Web",
//       },
//     ],
//     icon: "code",
//   },
//   {
//     formats: [
//       {
//         company: "microsoft",
//         extensions: "thmx",
//         name: "Office Theme",
//       },
//     ],
//     icon: "easel",
//   },
//   {
//     formats: [
//       {
//         company: "microsoft",
//         extensions: ["slk", "sylk"],
//         name: "Symbolic Link",
//       },
//       {
//         company: "microsoft",
//         extensions: [
//           "xla",
//           "xlam",
//           "xls",
//           "xlsb",
//           "xlsm",
//           "xlsx",
//           "xlt",
//           "xltm",
//           "xltx",
//           "xlw",
//         ],
//         name: "Excel",
//       },
//     ],
//     icon: "excel",
//   },
//   {
//     formats: [
//       {
//         extensions: "bmp",
//         name: "Bitmap",
//       },
//       {
//         company: "microsoft",
//         extensions: "emf",
//         name: "Enhanced Windows Metafile",
//       },
//       {
//         extensions: "gif",
//         name: "GIF",
//       },
//       {
//         extensions: ["jpg", "jpeg"],
//         name: "JPEG",
//       },
//       {
//         extensions: "png",
//         name: "PNG",
//       },
//       {
//         extensions: "tif",
//         name: "TIFF",
//       },
//       {
//         company: "microsoft",
//         extensions: "wmf",
//         name: "Windows Metafile",
//       },
//       {
//         company: "microsoft",
//         extensions: "emf",
//         name: "Windows Enhanced Metafile",
//       },
//     ],
//     icon: "image",
//   },
//   {
//     formats: [
//       {
//         color: "",
//         company: "apache",
//         extensions: "odp",
//         name: "OpenDocument Presentation",
//       },
//     ],
//     icon: "slides",
//   },
//   {
//     formats: [
//       {
//         color: "",
//         company: "apache",
//         extensions: "odt",
//         name: "OpenDocument Text",
//       },
//       {
//         color: "#808080",
//         extensions: "rtf",
//         name: "Rich Text",
//       },
//       {
//         extensions: "xps",
//         name: "XPS",
//       },
//     ],
//     icon: "richtext",
//   },
//   {
//     formats: [
//       {
//         extensions: "csv",
//         name: "CSV",
//       },
//       {
//         extensions: "dbf",
//         name: "dBase database",
//       },
//       {
//         extensions: "dif",
//         name: "Data Interchange",
//       },
//       {
//         color: "",
//         company: "apache",
//         extensions: "ods",
//         name: "OpenDocument Spreadsheet",
//       },
//       {
//         extensions: "xml",
//         name: "XML",
//       },
//     ],
//     icon: "spreadsheet",
//   },
//   {
//     formats: [
//       {
//         extensions: "prn",
//         name: "Formatted Text",
//       },
//       {
//         color: "#808080",
//         extensions: "txt",
//         name: "Plain Text",
//       },
//     ],
//     icon: "text",
//   },
//   {
//     formats: [
//       {
//         color: "",
//         company: "microsoft",
//         extensions: [
//           "pot",
//           "potm",
//           "potx",
//           "ppa",
//           "ppam",
//           "pps",
//           "ppsm",
//           "ppsx",
//           "ppt",
//           "pptm",
//           "pptx",
//         ],
//         name: "PowerPoint",
//       },
//     ],
//     icon: "powerpoint",
//   },
//   {
//     formats: [
//       {
//         color: "#FA0F00",
//         company: "adobe",
//         extensions: "pdf",
//         name: "PDF",
//       },
//     ],
//     icon: "pdf",
//   },
//   {
//     formats: [
//       {
//         extensions: "mp4",
//         name: "MPEG-4",
//       },
//       {
//         company: "microsoft",
//         extensions: "wmv",
//         name: "Windows Media Video",
//       },
//     ],
//     icon: "play",
//   },
//   {
//     formats: [],
//     icon: "post",
//   },
//   {
//     formats: [
//       {
//         color: "",
//         company: "microsoft",
//         extensions: ["doc", "docm", "docx", "dot", "dotm", "dotx"],
//         name: "Word",
//       },
//     ],
//     icon: "word",
//   },
// ];

// const mimeTypes: { [k: string]: FileType } = {
//   application: {
//     Icon: dynamic(() => import("./icons/mime/application")),
//     name: "Application",
//   },
//   audio: {
//     Icon: dynamic(() => import("./icons/mime/audio")),
//     name: "Audio",
//   },
//   font: {
//     Icon: dynamic(() => import("./icons/mime/font")),
//     name: "Font",
//   },
//   image: {
//     Icon: dynamic(() => import("./icons/mime/image")),
//     name: "Image",
//   },
//   model: {
//     Icon: dynamic(() => import("./icons/mime/model")),
//     name: "Model",
//   },
//   text: {
//     Icon: dynamic(() => import("./icons/mime/text")),
//     name: "Text",
//   },
//   video: {
//     Icon: dynamic(() => import("./icons/mime/video")),
//     name: "Video",
//   },
// };

// export function getFileType(
//   name: string,
//   options?: { earmark?: boolean; fill?: boolean }
// ) {
//   const extension = name.slice(
//     (Math.max(0, name.lastIndexOf(".")) || Infinity) + 1
//   );
//   const icon = Object.keys(options)
//     .filter((option) => options[option])
//     .map((option) => option.charAt(0).toUpperCase() + option.slice(1))
//     .join("");
//   const fileType = fileTypes.find(({ formats }) =>
//     formats.find(({ extensions }) =>
//       Array.isArray(extensions)
//         ? extensions.includes(extension)
//         : String(extensions) === extension
//     )
//   );
//   const type = mime.getType(extension);

//   return (
//     fileType
//       ? {
//           ...fileType.formats[0],
//           Icon: dynamic(() => import(`./icons/file/${fileType.icon}` + icon)),
//           company: companies[fileType.formats[0].company as any] ?? undefined,
//         }
//       : type
//       ? mimeTypes[type?.substring(0, type?.indexOf("/"))]
//       : {
//           Icon: dynamic(() => import("./icons/file/default" + icon)),
//           name: "File",
//         }
//   ) as FileType;
// }
