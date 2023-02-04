<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<main>
    <h1>GS1 Tag</h1>
    <!-- 
    {#each data.w as w}
        <p>{w}</p>
    {/each} -->

    <hr />

    <!-- <table>
        <thead>
            <tr>
                <th>AI</th>
                <th>Data</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">{data.all}</th>
                <td>
                    {data.all}
                </td>
            </tr>
        </tbody>
    </table> -->
    <!-- <script src="script.js"></script> -->

    


</main>

<style>
    table,
    tr,
    th,
    td,
    caption {
        border: 1px solid #eee;
        font-family: 'Courier New', Courier, monospace;
        border-collapse: collaps;
        padding: 0.5rem;
    }
</style>
