export default function Page({ params }: { params: { slide: string[] } }) {
  // return (
  //   <Pump
  //     draft={draftMode().isEnabled}
  //     next={{ revalidate: 60 }}
  //     queries={[
  //       {
  //         investors: {
  //           __args: {
  //             filter: {
  //               _sys_slug: { eq: params.slide.at(-1) },
  //             },
  //           },
  //           items: {
  //             _slug: true,
  //             _title: true,
  //             content: {
  //               json: {
  //                 content: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     ]}
  //   >
  //     {async ([{ investors }]) => {
  //       "use server"; // Needs to be a Server Action
  //       return (
  //         <div className={styles.root}>
  //           {/* <p>{apps.items[0]?.status}</p>
  //       <Image alt="" quality={100} src={icon} />
  //       <p>{apps.items[0]?.description}</p> */}
  //         </div>
  //       );
  //     }}
  //   </Pump>
  // );
}
