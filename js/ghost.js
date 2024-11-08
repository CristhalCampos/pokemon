//Ejecutar luego de cargar la pagina
window.addEventListener('load', () => {
  //Espera que cargue la respuesta de la API
  let loadingSearch = false;
  async function pokemonByType(type) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      const pokemonList = data.pokemon.map(poke => poke.pokemon.name);
      
      // Longitud del array pokemonList
      console.log(`Número de Pokémon de tipo ${type}:`, pokemonList.length);
      console.log("Lista de Pokémon:", pokemonList);

      //Como es una lista demasiado larga, solo se muestran los primeros 8
      for (let i = 0; i < 12; i++) {
        //Llamar a la función para obtener los datos de cada Pokemon
        getPokemonData(pokemonList[i], i + 1);
      }
    } catch (error) {
      console.error(`Error al obtener Pokémon de tipo ${type}:`, error);
    }
  }

  // Función para obtener los datos de un Pokémon por su nombre
  async function getPokemonData(pokemonName, id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      const pokemon = {
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map(type => type.type.name),
        abilities: data.abilities.map(ability => ability.ability.name),
        stats: data.stats.map(stat => ({ name: stat.stat.name, baseStat: stat.base_stat })),
      };
      //Llamar a la función para mostrar estos datos en el HTML
      displayPokemon(pokemon, id);
    } catch (error) {
      console.error(`Error al obtener datos del Pokemon ${pokemonName}:`, error);
    }
  }
  
  // Función para mostrar los datos en el HTML
  function displayPokemon(pokemon, id) {
    if (id !== 0) {
      const resultContainer = document.getElementById("pokemon-container");
      const pokemonElement = document.createElement("div");
      pokemonElement.classList.add("pokemon");
      pokemonElement.id = `pokemon-${id}`;
      pokemonElement.innerHTML = `
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <p>Tipos: ${pokemon.types.join(', ')}</p>
        <p>Habilidades: ${pokemon.abilities.join(', ')}</p>
        <div>
          ${pokemon.stats.map(stat => `<p>${stat.name}: ${stat.baseStat}</p>`).join('')}
        </div>
      `;
      resultContainer.appendChild(pokemonElement);
    } else {
      //mostrar el pokemon buscado
      const pokemonElement = document.createElement("div");
      pokemonElement.id = "pokemon-loaded";
      pokemonElement.innerHTML = `
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <p>Tipos: ${pokemon.types.join(', ')}</p>
        <p>Habilidades: ${pokemon.abilities.join(', ')}</p>
        <div>
          ${pokemon.stats.map(stat => `<p>${stat.name}: ${stat.baseStat}</p>`).join('')}
        </div>
      `;
      document.getElementById("pokemon-0").appendChild(pokemonElement);
      loadingSearch = false; //Finaliza el estado de carga
      //Elimina el elemento de carga si la propiedad css del contenedor pokemon-0 es block
      const loadingElementSearch = document.getElementById(`pokemon-0-loading`);
      document.getElementById("pokemon-0").removeChild(loadingElementSearch);
    }
  }

  async function searchPokemon() {
    loadingSearch = true; //Iniciamos el estado de carga
    const container = document.getElementById("pokemon-0");
    const p = document.createElement("p");
    p.id = `pokemon-0-loading`;
    p.textContent = "Cargando...";
    container.appendChild(p);
    try {
      //Valor ingresado en el campo de búsqueda
      const searchValue = document.getElementById("pokemon-search").value.trim().toLowerCase();

      //Verificar si el campo de búsqueda no está vacío
      if (searchValue) {
        //Solicitud a la API de Pokemon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
        const data = await response.json();
        //Almacena los datos obtenidos
        const pokemon = {
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map(type => type.type.name),
          abilities: data.abilities.map(ability => ability.ability.name),
          stats: data.stats.map(stat => ({ name: stat.stat.name, baseStat: stat.base_stat })),
        }

        //Verificar que no hay un div con el id pokemon-loaded en el contenedor pokemon-0
        if (container.style.display === "flex" && document.getElementById("pokemon-loaded")) {
          //Elimina el div con el id pokemon-loaded
          document.getElementById("pokemon-loaded").remove();
          //Llamar a la función para mostrar estos datos en el HTML
          displayPokemon(pokemon, 0);
        } else {
          //Cambiar propiedad css del contenedor pokemon-0
          container.style.display = "flex";
          container.style.flexDirection = "column";
          container.style.alignItems = "center";
          //Llamar a la funcion para mostrar estos datos en el HTML
          displayPokemon(pokemon, 0);
        }
      } else {
        alert("Por favor, ingresa un nombre de Pokemon valido");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  document.getElementById("search").addEventListener("click", searchPokemon);

  document.getElementById("❌").addEventListener("click", () => {
    document.getElementById("btns-phone").style.display = "grid"
    document.getElementById("btns-phone").style.gridTemplateColumns = "repeat(2, 1fr)"
  })

  pokemonByType("ghost");
});