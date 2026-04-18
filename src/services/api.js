// function fetchFossils() {
//     console.log("Fetching fossils data...");
// }
// export { fetchFossils };

// On appelle la clé une seule fois 
// On récupère la clé depuis les variables d'environnement
const apiKey = import.meta.env.VITE_NOOKIPEDIA_API_KEY;

// List of fossils to display in the gallery
export async function fetchAllFossils(){
    // On récupère la clé depuis les variables d'environnement
    try {
        const response = await fetch('https://api.nookipedia.com/nh/fossils/individuals', {
            method: 'GET',
            headers : {
                'X-API-KEY': apiKey,
                'Accept-Version': '1.0.0',
            }
        });
        if (response.status == 200){
            const data = await response.json()
            console.log("Recovered fossils:", data)
            return data
        }else {           
             throw new Error (response.statusText)
        }
    } catch (error) {
        console.error('Error fetching fossils group:', error)
        return [];
}
}
// Single fossil
export async function fetchSingleFossil(fossil){
    try {
        const response = await fetch(`https://api.nookipedia.com/nh/fossils/individuals/${encodeURIComponent(fossil)}`, {
            method: 'GET',
            headers : {
                'X-API-KEY': apiKey,
                'Accept-Version': '1.0.0',
            }
        });
        if (response.status == 200){
            const data = await response.json()
            return data
        }else {
             throw new Error (response.statusText)
        }
    } catch (error) {
        console.error('Error fetching single fossil:', error)
        return [];
    }
}

// List of artworks
export async function fetchAllArtworks(){
    try {
        const response = await fetch('https://api.nookipedia.com/nh/art', {
            method: 'GET',
            headers : {
                'X-API-KEY': apiKey,
                'Accept-Version': '1.0.0',
            }
        });
        if (response.status == 200){
            const data = await response.json()
            console.log("Recovered artworks:", data)
            return data
        }else {           
             throw new Error (response.statusText)
        }
    } catch (error) {
        console.error('Error fetching artworks:', error)
        return [];
}
}
// Single artwork
export async function fetchSingleArtwork(artwork){
    try {
        const response = await fetch(`https://api.nookipedia.com/nh/art/${encodeURIComponent(artwork)}`, {
            method: 'GET',
            headers : {
                'X-API-KEY': apiKey,
                'Accept-Version': '1.0.0',
            }
        });
        if (response.status == 200){
            const data = await response.json()
            return data
        }else {
             throw new Error (response.statusText)
        }
    } catch (error) {
        console.error('Error fetching single artwork:', error)
        return [];
    }
}


// List of bugs
export async function fetchAllBugs(){
    try {
        const response = await fetch('https://api.nookipedia.com/nh/bugs', {
            method: 'GET',
            headers : {
                'X-API-KEY': apiKey,
                'Accept-Version': '1.0.0',
            }
        });
        if (response.status == 200){
            const data = await response.json()
            console.log("Recovered bugs:", data)
            return data
        }else {           
             throw new Error (response.statusText)
        }
    } catch (error) {
        console.error('Error fetching bugs:', error)
        return [];
}
}
// Single bug : information about a specific bug 
export async function fetchSingleBug(bug){
    try {
        const response = await fetch(`https://api.nookipedia.com/nh/bugs/${encodeURIComponent(bug)}`, {
            method: 'GET',
            headers : {
                'X-API-KEY': apiKey,
                'Accept-Version': '1.0.0',
            }
        });
        if (response.status == 200){
            const data = await response.json()
            console.log("Recovered single bug:", data)
            return data
        }else {           
             throw new Error (response.statusText)
        }
    } catch (error) {
        console.error('Error fetching single bug:', error)
        return [];
    }
}

// List of fish
export async function fetchAllFish(){
    try {
        const response = await fetch('https://api.nookipedia.com/nh/fish', {
            method: 'GET',
            headers : {
                'X-API-KEY': apiKey,
                'Accept-Version': '1.0.0',
            }
        });
        if (response.status == 200){
            const data = await response.json()
            console.log("Recovered fish:", data)
            return data
        }else {           
             throw new Error (response.statusText)
        }
    } catch (error) {
        console.error('Error fetching fish:', error)
        return [];
}
}   
// Single fish : information about a specific fish
export async function fetchSingleFish(fish){
    try {
        const response = await fetch(`https://api.nookipedia.com/nh/fish/${encodeURIComponent(fish)}`, {
            method: 'GET',
            headers : {
                'X-API-KEY': apiKey,
                'Accept-Version': '1.0.0',
            }
        });
        if (response.status == 200){
            const data = await response.json()
            console.log("Recovered single fish:", data)
            return data
        }else {           
             throw new Error (response.statusText)
        }
    } catch (error) {
        console.error('Error fetching single fish:', error)
        return [];
    }
}


// List of sea creatures
export async function fetchAllSeaCreatures(){
    try {
        const response = await fetch('https://api.nookipedia.com/nh/sea', {
            method: 'GET',
            headers : {
                'X-API-KEY': apiKey,
                'Accept-Version': '1.0.0',
            }
        });
        if (response.status == 200){
            const data = await response.json()
            console.log("Recovered sea creatures:", data)
            return data
        }else {           
             throw new Error (response.statusText)
        }
    } catch (error) {
        console.error('Error fetching sea creatures:', error)
        return [];
}
}

// Single sea creature
export async function fetchSingleSeaCreature(seaCreature){
    try {
        const response = await fetch(`https://api.nookipedia.com/nh/sea/${encodeURIComponent(seaCreature)}`, {
            method: 'GET',
            headers : {
                'X-API-KEY': apiKey,
                'Accept-Version': '1.0.0',
            }
        });
        if (response.status == 200){
            const data = await response.json()
            return data
        }else {
             throw new Error (response.statusText)
        }
    } catch (error) {
        console.error('Error fetching single sea creature:', error)
        return [];
    }
}