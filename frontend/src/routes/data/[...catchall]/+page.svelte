<script lang="ts">
    import type { PageData } from './$types';
    import type { ProductData, Dose } from '$lib/props/types';
    import HandleData from '$lib/components/HandleData.svelte';

    export let data: PageData;

    // Do something with this data
    // console.log(data);
    /*
    data. 
    */
</script>

<main>
    <!-- <h1>GS1 Tag</h1> -->
    <!-- 
    {#each data.w as w}
        <p>{w}</p>
    {/each} -->

    <style>
        .container {
            padding: 1em;
        }
        .grid {
            display: grid;
            grid-template-columns: 30% 70%;
            grid-gap: 0.5em;
            grid-auto-rows: minmax(25px, auto);
            justify-content: stretch;

            /* border:#000 5px solid; */
        }

        .grid-header {
            grid-column: 1/3;
            font-weight: bold;
        }

        .grid > div {
            background: #333;
            padding: 0.5em;
            box-shadow: 3px 3px 0px #000;
            border-radius: 0.1rem;
        }
        .grid > div:nth-child(even) {
            background: #222;
            padding: 0.5em;
            font-weight: bold;
        }
    </style>
    <div class="container">
        <div class="grid">
            <div class="grid-header">Product Information</div>
            <HandleData {data} />
        </div>
    </div>
</main>
