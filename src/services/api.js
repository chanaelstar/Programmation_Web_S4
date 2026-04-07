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
        // Ajout de ?thumbsize=300 pour optimiser le chargement de la galerie
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

