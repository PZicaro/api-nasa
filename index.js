class Neo {
    constructor(id, name, Diametro, Colisao){
        this.id=id,
        this.name = name,
        this.Diametro=Diametro,
        this.Colisao= Colisao
    }
}
async function getNeos(){
    const response = await fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY")
    const result = await response.json()
    return result["near_earth_objects"]
}

async function loadNeos(){
    let neos=[];
    let neoJson = await getNeos();
    
    neoJson.forEach(element => {
        const newNeo = new Neo(element["id"], element["name"], element["estimated_diameter"], element["is_sentry_object"])
        neos.push(newNeo)
       
    });
    renderNeos(neos) 
}
function renderNeos(neos){
    let list = document.querySelector('#neos-list');
    neos.forEach(neos => {
        let newli = document.createElement("li");
        text = `${neos.id}| ${neos.name}| ${neos.Diametro}| ${neos.Colisao}`
        newli.innerHTML=text
        list.appendChild(newli)
    });
}
loadNeos()