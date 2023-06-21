import { component$, useResource$, Resource, useStylesScoped$ } from '@builder.io/qwik';
import styles from './beer-selector.css?inline';

export interface Beer {
  name: string;
}

export const BeerSelector = component$(() => {
  useStylesScoped$(styles);

  const beerResource = useResource$<Beer[]>(async () => {
    const rs = await fetch('http://localhost:4173/api/beers');
    return rs.json();
  });

  return <div>
    <Resource
      value={beerResource}
      onPending={() => <span>loading...</span>}
      onRejected={(reason) => <span>error with {reason}</span>}
      onResolved={(beers) => <select>
        {beers.map((beer, idx) => <option key={idx}>{beer.name}</option>)}
      </select>}
    />
  </div>
});
