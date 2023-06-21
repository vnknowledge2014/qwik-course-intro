import { component$, useTask$, useSignal, useContextProvider } from '@builder.io/qwik';
import { Projector } from './projector';
import { searchContextId } from './search-context-id';
export default component$(() => {

  const messageSignal = useSignal('');
  const colorSignal = useSignal('black');

  useContextProvider(searchContextId, {
    messageSignal,
    colorSignal
  });

  useTask$(({ track }) => {
    track(() => messageSignal.value);
    if (messageSignal.value.indexOf('doggo') !== -1) {
      colorSignal.value = 'red';
    } else {
      colorSignal.value = 'black';
    }
  });

  return <div>
    This is Page 1

    <hr />

    <input type="text" placeholder="Type your search" onInput$={(e) => messageSignal.value = (e.target as HTMLInputElement)?.value} />

    <hr />

    <Projector>Your message is: </Projector>
  </div>
});
