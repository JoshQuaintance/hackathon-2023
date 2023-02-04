<script lang="ts">
    import type { PageData } from '@sveltejs/kit';

    export let data: PageData;
</script>

<main>
    <h2>GS1 Tag</h2>
    <table>
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
    </table>
    <!-- <script src="script.js"></script> -->
</main>
