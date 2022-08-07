import fetch from 'node-fetch';

export async function lookupByCoordinates({
    coordinates,
}: {
    coordinates: {lat: string; lon: string};
}) {
    const request = await fetch('https://api.postcode-api.xyz/api/v2/lookup', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            coordinates,
        }),
    });

    const response = await request.json();

    if (!Array.isArray(response.errors)) {
        throw new Error(JSON.stringify(response.errors));
    }

    return response?.data;
}

export async function lookupByAddress({
    houseNumber,
    postalCode,
}: {
    postalCode: string;
    houseNumber: string;
}) {
    const request = await fetch('https://api.postcode-api.xyz/api/v2/lookup', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            house_number: houseNumber,
            postal_code: postalCode,
        }),
    });

    const response = await request.json();

    if (!Array.isArray(response.errors)) {
        throw new Error(JSON.stringify(response.errors));
    }

    return response?.data;
}
