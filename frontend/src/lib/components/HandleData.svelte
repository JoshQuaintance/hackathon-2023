<script lang="ts">
    import type { ProductData } from '$lib/props/types';

    export let data: ProductData;
    const colors_array: string[] = ['#3d747573', '#479c9d73', '#6eb5aa73', '#88af9573', '#819a7873'];
</script>

{#each Object.entries(data) as [header, value], i}
    {#if value !== null}
        <div class="item" style={'background-color:' + colors_array[i % colors_array.length]}>{header}</div>
        {#if value === undefined}
            <div class="item">{''}</div>
        {:else if typeof value == 'object'}
            <div class="item">
                {#if 'data' in value}
                    <!-- <button type="button" class="collapsible"> -->
                    <div class="content">
                        <div class="grid">
                            {#if value.data && 'attributes' in value.data}
                                <svelte:self data={value.data.attributes} />
                            {:else if value.data}
                                {#each value.data as a1}
                                    {#if a1 && 'attributes' in a1}
                                        <svelte:self data={a1.attributes} />
                                        <div class="item">{''}</div>
                                        <div class="item">{''}</div>
                                    {/if}
                                {/each}
                            {/if}
                        </div>
                    </div>
                    <!-- </button> -->
                {:else if 'qty' in value}
                    {value.qty} <br /> {'Type: ' + value.type}
                {:else if 'dose' in value}
                    {value.dose + ' ' + value.units}
                {:else if 'temperature' in value}
                    {value.temperature + ' '}
                {/if}
            </div>
        {:else}
            <div class="item">{value}</div>
        {/if}
    {/if}
{/each}

<style>
    .container {
        padding: 1em;
    }
    .grid {
        display: grid;
        grid-template-columns: 30% 70%;
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
