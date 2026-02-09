// function fetchFossils() {
//     console.log("Fetching fossils data...");
// }
// export { fetchFossils };

async function fetchFossilsGroup(){
    try {
        const response = await fetch('https://api.nookipedia.com/nh/fossils/groups', {
            headers : {
                'X-API-KEY': 'YOUR_API_KEY',
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

