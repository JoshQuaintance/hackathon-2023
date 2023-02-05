
import GS1DigitalLinkToolkit from '$lib/props/GS1DigitalLinkToolkit';
import type { ProductData } from '../../../lib/props/types';

const website = "https://hackathon-frontend-production.up.railway.app/api";


export async function load({ params }: any) {
    const slug = params.slug;
    if (!['capture', 'query'].includes(slug)) {
        return {
            status: 400,
            error: 'Invalid method. Can only be /query or /capture'
        }
    }

    const digitalLink = "https://clrx.vercel.app/" + params.catchall;
    const gs1dlt = new GS1DigitalLinkToolkit();

    const el = gs1dlt.extractFromGS1digitalLink(digitalLink);

    function getDataFromAI(el: any): { ai: string, value: string, label: string }[] {
        const ais = []

        for (const ai of Object.keys(el.GS1)) {
            const found = gs1dlt.aitable.filter(d => d.ai == ai)
            if (found.length == 0) continue;

            ais.push({
                ai,
                value: el.GS1[ai],
                label: found[0].label as string
            })

        }

        return ais
    }

    const identifier = getDataFromAI(el).filter(ai => gs1dlt.aiMaps.identifiers.indexOf(ai.ai))[0]

    let api = identifier.label.toLowerCase();
    if (api == 'gtin') api = 'product'
    const products = `${website}/${api}s?populate=*`;
    const response = await fetch(products);

    if (response.status === 400) {
        throw new Error('Error: Invalid Request');
    }

    const json_data = await response.json();
    const data = json_data.data;

    function findew() {
        for (const p of data) {
            const keys = Object.keys(p.attributes);
            const filtered = keys.filter(k => k.indexOf(identifier.label.toLowerCase()) > -1)

            for (const key of filtered) {

                console.log(p.attributes[key], identifier.value)
                if (p.attributes[key] == identifier.value) return p.attributes as ProductData
            }
        }
    }
    const dataFound = findew();


    return dataFound

}