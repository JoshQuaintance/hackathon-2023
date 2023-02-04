// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageLoad} */
export function load({ params }) {
    return {
        header: 'x7F',
        aidc: 'x22',
        filter: 'b010',
        sscc: 'xA560100F9',
        ai: 'x02',
        gtin: 'x0E192001AF3',
        all: params.catchall,
        // w: ['123', '2341', '32142']


    };

}