export async function postData(url: string, data: any) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content_type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.status
    } catch (error) {
        console.error(error);
        return error;
    }
}