/**
 * @tutorial https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/tree/main
 */

export function addToCalendar(props: {
  allDay?: boolean;
  end?: string | Date;
  start: string | Date;
}) {
  const start =
    typeof props.start === "string" ? new Date(props.start) : props.start;
  const end = typeof props.end === "string" ? new Date(props.end) : props.end;

  return;
}
