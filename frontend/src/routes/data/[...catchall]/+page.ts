// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { error } from '@sveltejs/kit';
import type { ProductData } from '../../../lib/props/types';

const website = "https://hackathon-frontend-production.up.railway.app/api";


/** @type {import('@sveltejs/kit').PageLoad} */
export async function load() {
    /*
    fetch data from the internet
    if you're tryin to use GET
    fetch('website/api/whatyouwanttoget');

    fetch('website/data/data', {
        method: 'POST' (create) | 'PUT' (Updated) 
    })
    // */
    const products = website.concat("/products?populate=*");
    const response = await fetch(products);
    // 
    if (response.status === 400) {
        throw new Error('Error: Invalid Request');
    }
    const json_data = await response.json();
    console.log(json_data);
    const firstData: ProductData = json_data.data[0].attributes;
    // console.log(data);
    return firstData;
    // fetch();
}