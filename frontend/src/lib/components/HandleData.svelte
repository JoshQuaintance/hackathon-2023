<script lang="ts">
    export let data: Object;
    const colors_array: string[] = ['#3d7475', '#479c9d', '#6eb5aa', '#88af95', '#819a78'];
</script>

{#each Object.entries(data) as [header, value]}
    <div class="item">{header}</div>
    {#if value === null}
        <div class="item">{''}</div>
    {:else if typeof value == 'object'}
        <div class="item">
            {#if 'data' in value}
                <button type="button" class="collapsible">
                    <div class="content">
                        <div class="grid">
                            {#if 'attributes' in value.data}
                                <svelte:self data={value.data.attributes} />
                            {:else}
                                {#each value.data as a1}
                                    {#if 'attributes' in a1}
                                        <svelte:self data={a1.attributes} />
                                    {/if}
                                {/each}
                            {/if}
                        </div>
                    </div>
                </button>
            {:else if 'qty' in value}
                {value.type + '\tType: ' + value.type}
            {:else if 'dose' in value}
                {value.dose + ' ' + value.units}
            {:else if 'temperature' in value}
                {value.temperature + ' ' + value.type}
            {/if}
        </div>
    {:else}
        <div class="item">{value}</div>
    {/if}
{/each}
<div class="item" />
