<script>
  import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte';
  import gql from 'graphql-tag';
  import { createApolloClient } from '../_graphql';

  // import { getClient, setClient, query, subscribe } from 'svelte-apollo';

  import { writable } from 'svelte/store';

  const qwerty = writable(new Promise(() => {}));
  const xyz = writable(new Promise(() => {}));

  onMount(() => {
    console.log('onMount');

    const client = createApolloClient();

    let aaa = client.query({
      query: gql`{ random }`
    }); //.then(result => result.data.random);
    xyz.set(aaa);

    let abc = client.subscribe({
      query: gql`subscription { randoms }`
    })
    .subscribe(result => {
      console.log(result.data)
    //  random = j.data.randoms
    });
    qwerty.set(abc);
  });
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>

<!-- <div>
  Random: {random}
</div> -->
<div>
{#await $xyz}
  Loading...
{:then result}
  Result: {JSON.stringify(result.data)}
{:catch error}
  Error: {error}
{/await}
</div>

<!-- <div>
{#await $qwerty}
LLLLLL
{:then result}
foo: {result.data}
{:catch error}
error: {error}
{/await}
</div> -->
