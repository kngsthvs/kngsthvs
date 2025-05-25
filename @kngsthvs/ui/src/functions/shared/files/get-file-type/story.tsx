import type { Meta /* type StoryObj */ } from "@storybook/react";

// import { getFileType } from "../getFileType";

// const meta: Meta<typeof getFileType> = {
const meta: Meta = {
	parameters: {
		layout: "centered",
	},
	title: "Functions/Shared/getFileType",
};

export default meta;

// type FileType = {
//   name: string;
//   earmark?: boolean;
//   fill?: boolean;
// };

// export const Default: StoryObj<FileType> = {
//   args: {
//     name: "example.pdf",
//     earmark: false,
//     fill: false,
//   },
//   render: (args) => {
//     const { Icon, ...fileType } = getFileType(args.name, {
//       earmark: args.earmark,
//       fill: args.fill,
//     });

//     return (
//       <>
//         <Icon style={{ height: "3rem", width: "3rem" }} />

//         <pre>{JSON.stringify(fileType, null, 2)}</pre>
//       </>
//     );
//   },
// };

// export const Earmark: StoryObj<FileType> = {
//   args: {
//     name: "example.pdf",
//     earmark: true,
//     fill: false,
//   },
//   render: (args) => {
//     const { Icon, ...fileType } = getFileType(args.name, {
//       earmark: args.earmark,
//       fill: args.fill,
//     });

//     return (
//       <>
//         <Icon style={{ height: "3rem", width: "3rem" }} />

//         <pre>{JSON.stringify(fileType, null, 2)}</pre>
//       </>
//     );
//   },
// };

// export const Fill: StoryObj<FileType> = {
//   args: {
//     name: "example.pdf",
//     earmark: false,
//     fill: true,
//   },
//   render: (args) => {
//     const { Icon, ...fileType } = getFileType(args.name, {
//       earmark: args.earmark,
//       fill: args.fill,
//     });

//     return (
//       <>
//         <Icon style={{ height: "3rem", width: "3rem" }} />

//         <pre>{JSON.stringify(fileType, null, 2)}</pre>
//       </>
//     );
//   },
// };

// export const EarmarkFill: StoryObj<FileType> = {
//   args: {
//     name: "example.pdf",
//     earmark: true,
//     fill: true,
//   },
//   render: (args) => {
//     const { Icon, ...fileType } = getFileType(args.name, {
//       earmark: args.earmark,
//       fill: args.fill,
//     });

//     return (
//       <>
//         <Icon style={{ height: "3rem", width: "3rem" }} />

//         <pre>{JSON.stringify(fileType, null, 2)}</pre>
//       </>
//     );
//   },
// };
