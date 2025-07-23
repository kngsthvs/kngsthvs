// const route = app.post(
// 	"/posts",
// 	zValidator(
// 		"form",
// 		z.object({
// 			body: z.string(),
// 			title: z.string(),
// 		}),
// 	),
// 	(c) => {
// 		// ...
// 		return c.json(
// 			{
// 				message: "Created!",
// 				ok: true,
// 			},
// 			201,
// 		);
// 	},
// );

// export type AppType = typeof route;
