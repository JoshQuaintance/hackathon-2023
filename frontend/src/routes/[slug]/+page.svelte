<script lang="ts">
    import { goto } from '$app/navigation';
    import GS1DigitalLinkToolkit from '$lib/props/GS1DigitalLinkToolkit';

    let code: HTMLInputElement;
    const gs1dtl = new GS1DigitalLinkToolkit();

    function submitCode() {
        let s = code.value;
        let es = gs1dtl.extractFromGS1elementStrings(s);
        let data = gs1dtl.gs1ElementStringsToGS1DigitalLink(s, false, window.location.host);

        let path = window.location.pathname;
        goto(path + data.replace(window.location.host, ''));
    }
</script>

<div class="container">
    <h5>Enter your code below</h5>

    <input bind:this={code} type="text" />
    <button on:click={submitCode}>Submit</button>
</div>

<style>
    .container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    input {
        height: 5em;
        color: black;
    }

    button {
        border: solid 2px white;
        border-radius: 5px;
        padding: 0.5rem 0.8rem;
    }
</style>
