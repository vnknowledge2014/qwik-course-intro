import { component$, useSignal, useContext, useContextProvider, useTask$, Slot } from '@builder.io/qwik';
import { beerContextId } from './beer-context-id';
import { BeerSelector } from './beer-selector';

export default component$(() => {
  const isMyComponentVisibleSignal = useSignal(false);
  const didHeGetABeerSignal = useSignal(false);

  useContextProvider(beerContextId, didHeGetABeerSignal);

  useTask$(({ track }) => {
    track(() => didHeGetABeerSignal.value);

    if (didHeGetABeerSignal.value) {
      isMyComponentVisibleSignal.value = true;
    }
  });

  return (
    <>
      <div>
        Hello World!
      </div>
      {/* <button onClick$={() =>
        isMyComponentVisibleSignal.value = !isMyComponentVisibleSignal.value}>Ahoj!</button> */}

      <BeerGiver />

      {isMyComponentVisibleSignal.value ? <MyComponent>Tèn ten</MyComponent> : null}
    </>
  );
});

// interface BeerGivenProps {
//   gotBeerSignal: Signal<boolean>;
// }

// export const BeerGiver = component$((props: BeerGivenProps) => {
//   return <div>
//     <BeerGivingBtn gotBeerSignal={props.gotBeerSignal} />
//   </div>
// });

export const BeerGiver = component$(() => {
  return <div>
    <BeerSelector />
    <hr />
    <BeerGivingBtn />
  </div>
});

// export const BeerGivingBtn = component$((props: BeerGivenProps) => {
//   return <div>
//     <button onClick$={() => {
//       props.gotBeerSignal.value = true;
//     }}>Give a beer to Doggo</button>
//   </div>;
// })

export const BeerGivingBtn = component$(() => {
  const gotBeerSignal = useContext(beerContextId);
  return <div>
    <button class="p-5 bg-amber-500 text-lg hover:bg-amber-200" onClick$={() => {
      gotBeerSignal.value = true;
    }}>Give a beer to Doggo</button>
  </div>;
})


export const MyComponent = component$(() => {
  return <div><Slot /></div>;
})
