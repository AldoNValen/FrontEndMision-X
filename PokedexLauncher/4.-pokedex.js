// variables-------
// const pokeCard = document.getElementById("dvPokedex");
const dvPokeName = document.getElementById("dvName");
const pokeStats = document.getElementById("dvEstadisticas");
const pokePhoto = document.getElementById("pokeImg");
const pokeTypes = document.getElementById("dvTipo");
const pokeImg = document.getElementById("pokeImg");
const pokeMovimientos = document.getElementById("dvMovimientos");
// const pokeImgContainer = document.getElementById("dvImgContenerdor");
 const pokeId = document.getElementById("dvNumero");
 
 const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {

        if (res.status != "200") {

            console.log(res);

            errorPoke(res)
            
        }
        else {
            return res.json();
         
        }
    }).then((data) => {
        if (data) {

            console.log(data);

            let pokeImg = data.sprites.front_default;

            pokeInicio(data);

            console.log(pokeImg);
        }
    });
}

const errorPoke = res => {
 
    pokeStats.innerHTML=''
 
    pokePhoto.src = "./imagenes/pokemonSad.jpg";

    pokeMovimientos.innerHTML = '';

    pokeTypes.innerHTML = '';

    pokeId.innerHTML=''

    dvPokeName.textContent='No encontrado :('

    // esta parte busca si las palabras estan en la data  
   

}

const pokeInicio = data => {
 
    dvPokeName.textContent = data.name;

  
    pokePhoto.src = data.sprites.front_default;

    pokeId.textContent= `Número ${data.id}`;

    // esta parte busca si las palabras estan en la data  
    const { stats, types, moves } = data;

    enviaColor(types);
    enviaTipos(types);
    enviaEstadisticas(stats);
    enviaMovimientos(moves);


}

const enviaColor = types => {

   

    const colorOne = typeColors[types[0].type.name];

    //si existe un seundo color se llama
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;

    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const enviaTipos = types => {
   

    pokeTypes.innerHTML = '';

    //se realiza ciclo for para sacar los tipos
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;

        pokeTypes.appendChild(typeTextElement);
    });
}

const enviaEstadisticas = stats => {
 
    pokeStats.innerHTML = '';

    //Se realiza for para obtener las estadisticas

    pokeStats.textContent=`Estadisticas:`

    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");

        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const enviaMovimientos = moves => {
    let listaMov = [];

   

    pokeMovimientos.innerHTML = '';

    //Se realiza for para obtener las estadisticas
    pokeMovimientos.textContent=`Movimientos Top 10:`

//no se como ponerle un limitante al for each asi que se pasa su info a un arreglo
    moves.forEach(move =>  {

        listaMov.push(move.move.name)
                
        });

//se realiza for sobre el arreglo
    let numeroFor = 0

    const numeroMovInput = document.getElementById("numMov");
    let numeroMov = numeroMovInput.value;

        for (numeroFor ; numeroFor <= listaMov.length; numeroFor = numeroFor + 1) {
            
            if (numeroFor<= numeroMov){
                const statElement = document.createElement("div");
                const statElementName = document.createElement("div");
    
                statElementName.textContent = listaMov[numeroFor];
    
                statElement.appendChild(statElementName);
    
                pokeMovimientos.appendChild(statElement);
            }
           
        }
 
}
