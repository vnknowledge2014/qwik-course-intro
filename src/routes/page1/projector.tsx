import { component$, Slot, useContext } from "@builder.io/qwik";
import { searchContextId } from "./search-context-id";

// export interface ProjectorProps {
//   message: string;
//   color: string;
// }

// export const Projector = component$((props: ProjectorProps) => {
//   return (
//     <div>
//       <Slot />
//       <span style={`color: ${props.color}`}>{props.message}</span>
//     </div>
//   );
// });

export const Projector = component$(() => {
  const { messageSignal, colorSignal } = useContext(searchContextId);

  return (
    <div>
      <Slot />
      <span style={`color: ${colorSignal.value}`}>{messageSignal.value}</span>
    </div>
  );
});
