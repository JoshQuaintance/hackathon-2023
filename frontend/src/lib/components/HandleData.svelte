<script lang="ts">
    import type { ProductData } from '$lib/props/types';

    export let data: ProductData;
    const colors_array: string[] = ['#3d7475', '#479c9d', '#6eb5aa', '#88af95', '#819a78'];
</script>

{#each Object.entries(data) as [header, value]}
    <div class="item">{header}</div>
    {#if typeof value == 'object'}
        <div class="item">
            <button type="button" class="collapsible">
                <div class="content">
                    {#if value["data"] === undefined}

                    {/if}
                    {#each Object.entries(value) as [header2, value2]}
                        <div class="item">{header2}</div>
                    {/each}
                </div>
            </button>
        </div>
    {:else}
        <div class="item">{value}</div>
    {/if}
{/each}
<div class="item" />
