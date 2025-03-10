//Ejecutar luego de cargar la pagina
window.addEventListener('load', () => {
  const type = document.title;
  const pokemonContainer = document.getElementById("pokemon-container");
  let loadingPokemon = false;
  let loadingSearch = false;
  const loadMoreBtn = document.getElementById("load-more");
  let offset = 1;
  const limit = 12;
  let pokemonList = [];

  const pokemonTypes = [
    "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"
  ];

  // Crear los botones para cada tipo de Pokémon
  const btnsContainer = document.getElementById("btns");

  pokemonTypes.forEach(type => {
    const button = document.createElement("button");
    button.classList.add("button", "type");
    button.id = type;
    button.textContent = type;
    const anchor = document.createElement("a");
    anchor.href = `./${type}.html`;  // Enlace hacia la página correspondiente
    anchor.appendChild(button);
    btnsContainer.appendChild(anchor);
  });

  async function pokemonByType(type) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      pokemonList = data.pokemon.map(poke => poke.pokemon.name);

      loadNextBatch();
    } catch (error) {
      console.error(`Error al obtener Pokémon de tipo ${type}:`, error);
    }
  }

  // Función para obtener los datos de un Pokémon por su nombre
  async function getPokemonData(pokemonName, id) {
    loadingPokemon = true; //Iniciamos el estado de carga

    const container = document.createElement("div");
    container.classList.add("pokemon");
    container.id = `pokemon-${id}`;
    pokemonContainer.appendChild(container);
   
    const loader = document.createElement("span");
    loader.id = `pokemon-${id}-loading`;
    loader.classList.add("loader");
    container.appendChild(loader);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      const pokemon = {
        n: data.id,
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map(type => type.type.name),
        abilities: data.abilities.map(ability => ability.ability.name),
        stats: data.stats.map(stat => ({ name: stat.stat.name, baseStat: stat.base_stat })),
      };

      //Llamar a la función para mostrar estos datos en el HTML
      setTimeout(() => {
        displayPokemon(pokemon, id);
      }, "1500");
    } catch (error) {
      console.error(`Error al obtener datos del Pokemon ${pokemonName}:`, error);
    } finally {
      loadingPokemon = false; //Finalizamos el estado de carga
      const loadingElementPokemon = document.getElementById(`pokemon-${id}-loading`);
      container.removeChild(loadingElementPokemon);
    }
  }
  
  // Función para mostrar los datos en el HTML
  function displayPokemon(pokemon, id) {
    const pokemonElement = document.getElementById(`pokemon-${id}`);

    const numberElement = document.createElement("p");
    numberElement.textContent = `#${pokemon.n}`;
    numberElement.classList.add("number");
    pokemonElement.appendChild(numberElement);

    const nameElement = document.createElement("h3");
    nameElement.textContent = pokemon.name;
    nameElement.classList.add("name");
    pokemonElement.appendChild(nameElement);

    const imageElement = document.createElement("img");
    imageElement.src = pokemon.image;
    pokemonElement.appendChild(imageElement);

    const typesContainer = document.createElement("div");
    pokemon.types.forEach(type => {
      const typeTag = document.createElement("div");
      typeTag.classList.add("type-tag", type);
      const typeElement = document.createElement("p");
      typeElement.textContent = type;
      typesContainer.appendChild(typeTag);
      typeTag.appendChild(typeElement);
    });
    pokemonElement.appendChild(typesContainer);

    const abilitiesElement = document.createElement("p");
    abilitiesElement.textContent = `abilities: ${pokemon.abilities.join(', ')}`;
    pokemonElement.appendChild(abilitiesElement);

    //Asigna las estadísticas
    pokemon.stats.forEach(stat => {
      const statItem = document.createElement("p");
      statItem.textContent = `${stat.name}: ${stat.baseStat}`;
      pokemonElement.appendChild(statItem);
    });
  }

  // Cargar los Pokémon en lotes
  async function loadNextBatch() {
    if (offset >= pokemonList.length) {
      loadMoreBtn.remove(); // Ocultar el botón si no hay más Pokémon
      return;
    }

    const batch = pokemonList.slice(offset, offset + limit); // Obtener el lote de Pokémon
    batch.forEach((pokemon, index) => getPokemonData(pokemon, offset + index + 1));

    offset += limit; // Mover el offset al siguiente lote
  }

  async function searchPokemon() {
    loadingSearch = true; //Iniciamos el estado de carga

    const container = document.getElementById("pokemon-0");
    container.innerHTML = "";

    const loader = document.createElement("span");
    loader.id = `pokemon-0-loading`;
    loader.classList.add("loader");
    container.appendChild(loader);

    try {
      //Valor ingresado en el campo de búsqueda
      const searchValue = document.getElementById("pokemon-search").value.trim().toLowerCase();

      //Verificar si el campo de búsqueda no está vacío
      if (searchValue) {
        //Solicitud a la API de Pokemon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
        if (!response.ok) {
          alert("Por favor, ingresa un nombre de Pokemon valido");
          return;
        }
        const data = await response.json();
        //Almacena los datos obtenidos
        const pokemon = {
          n: data.id,
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map(type => type.type.name),
          abilities: data.abilities.map(ability => ability.ability.name),
          stats: data.stats.map(stat => ({ name: stat.stat.name, baseStat: stat.base_stat })),
        }

        // Mostrar los datos en el contenedor
        container.style.display = "block";
        displayPokemon(pokemon, 0);
      } else {
        alert("Por favor, ingresa un nombre de Pokemon valido");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loadingSearch = false; //Finaliza el estado de carga
      //Elimina el elemento de carga
      const loadingElementSearch = document.getElementById(`pokemon-0-loading`);
      container.removeChild(loadingElementSearch);
    }
  }
  
  // Evento para buscar un Pokémon
  document.getElementById("search").addEventListener("click", searchPokemon);

  // Evento para cargar más Pokémon
  loadMoreBtn.addEventListener("click", loadNextBatch);

  pokemonByType(type);
});