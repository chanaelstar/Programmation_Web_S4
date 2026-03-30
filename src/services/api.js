// function fetchFossils() {
//     console.log("Fetching fossils data...");
// }
// export { fetchFossils };

export async function fetchFossils(){
    // On récupère la clé depuis les variables d'environnement
  const apiKey = import.meta.env.VITE_NOOKIPEDIA_API_KEY;
    try {
        const response = await fetch('https://api.nookipedia.com/nh/fossils/groups', {
            headers : {
                'Accept-Version': '1.0.0',
            }
        })
        if (response.status == 200){
            const data = await response.json()
            console.log(data)
            return data
        }else {           
             throw new Error (response.statusText)
        }
    } catch (error) {
        console.error('Error fetching fossils group:', error)
}
}

