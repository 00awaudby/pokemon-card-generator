const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#ff0069",
    fighting: "#30336b",
    fire: "#fo932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#efb549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190ff",
}

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

let getPokeData = () => {
    //generate a random number 
    let id = Math.floor(Math.random() * 150) + 1;
    //combine the url with the pokemon id
    const finalUrl = url + id;
    //fetch generated URL
    fetch(finalUrl)
    .then((responce) => responce.json())
    .then((data) => {
            
            generatedCard(data)
    })
};

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);

//generate card


let generatedCard = (data) => {
    //get the data and assign it to variables
    console.log(data)
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1)
    const statAttack = data.stats[1].base_stat;
    const statDefence = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;


    //set theme color 
    const themeColor = typeColor[data.types[0].type.name];

    card.innerHTML = `
    <p class="hp">
    <span>HP</span>
    ${hp}
    </p>
    <img src=${imgSrc} />
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types">
      
    </div>
    <div class="stats">
        <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
        </div>
        <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
        </div>
        <div>
            <h3>${statDefence}</h3>
            <p>Defence</p>
        </div>
    </div>
    
    
    `;
    appendTypes(data.types);
    styleCard(themeColor);
};
let appendTypes = (types) => {
    
    types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
    
        document.querySelector(".types").appendChild(span);
    })
};

let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`;
    card.querySelectorAll(".types span").forEach(typeColor => {

     typeColor.style.backgroundColor = color

    })


}


