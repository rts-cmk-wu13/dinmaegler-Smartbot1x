


// Get all homes
export async function fetchBoliger(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `https://dinmaegler.onrender.com/homes${query ? '?' + query : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch boliger');
    return response.json();
}

// Get amount of homes for sale
export async function fetchBoligerCount() {
    const response = await fetch('https://dinmaegler.onrender.com/homes/count');
    if (!response.ok) throw new Error('Failed to fetch boliger count');
    return response.json();
}

// Get a number of homes (pagination)
export async function fetchBoligerPaginated(limit = 4, start = 0) {
    const url = `https://dinmaegler.onrender.com/homes?_limit=${limit}&_start=${start}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch paginated boliger');
    return response.json();
}

// Get single home by ID
export async function fetchBoligById(id) {
    const url = `https://dinmaegler.onrender.com/homes/${id}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch bolig by id');
    return response.json();
}

// Get homes by type
export async function fetchBoligerByType(type) {
    const url = `https://dinmaegler.onrender.com/homes?type_eq=${encodeURIComponent(type)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch boliger by type');
    return response.json();
}

// Get homes in price range
export async function fetchBoligerByPriceRange(min, max) {
    const url = `https://dinmaegler.onrender.com/homes?price_gte=${min}&price_lte=${max}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch boliger by price range');
    return response.json();
}
