window.addEventListener('load', () => {
  const pokemonContainer = document.getElementById("pokemon-container");

  //Espera que cargue la respuesta de la API
  let loadingPokemon = false;
  let loadingSearch = false;

  //Función para obtener los datos de un Pokémon por su ID
  async function getPokemonData(id) {
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
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      const data = await response.json();
      //Almacena los datos obtenidos
      const pokemon = {
        n: id,
        name: data.name,
        image: data.sprites.front_default,
        types: await Promise.all(data.types.map(type => type.type.name)),
        abilities: data.abilities.map(ability => ability.ability.name),
        stats: data.stats.map(stat => ({ name: stat.stat.name, baseStat: stat.base_stat })),
      }
      //Llamar a la función para mostrar estos datos en el HTML
      setTimeout(() => {
        updatePokemonHTML(id, pokemon);
      }, "1500");
    } catch (error) {
      console.error("Error al obtener datos del Pokemon:", error);
    } finally {
      loadingPokemon = false; //Finaliza el estado de carga
      //Elimina el elemento de carga
      const loadingElementPokemon = document.getElementById(`pokemon-${id}-loading`);
      container.removeChild(loadingElementPokemon);
    }
  }

  // Función para mostrar los datos en el HTML
  function updatePokemonHTML(id, pokemon) {
    const pokemonElement = document.getElementById(`pokemon-${id}`);

    const numberElement = document.createElement("p");
    numberElement.textContent = `#${pokemon.n}`;
    pokemonElement.appendChild(numberElement);

    const nameElement = document.createElement("h3");
    nameElement.textContent = pokemon.name;
    pokemonElement.appendChild(nameElement);

    const imageElement = document.createElement("img");
    imageElement.src = pokemon.image;
    pokemonElement.appendChild(imageElement);

    const typesElement = document.createElement("p");
    typesElement.textContent = `types: ${pokemon.types.join(', ')}`;
    pokemonElement.appendChild(typesElement);

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

  const loadMoreBtn = document.getElementById("load-more");
  let offset = 1;
  const limit = 12;
  const maxPokemon = 1010;

  //Llamar a la función para obtener los primeros 6 Pokemon por ID
  for (let i = offset; i < offset + limit; i++) {
    getPokemonData(i);
  }
  offset += limit;

  // Función para cargar Pokémon en lotes
  function loadMorePokemon() {
    for (let i = offset; i < offset + limit; i++) {
      if (i > maxPokemon) {
        loadMoreBtn.remove(); // Si no hay más Pokémon, elimina el botón
        return;
      }
      getPokemonData(i);
    }
    offset += limit;
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
        updatePokemonHTML(0, pokemon);
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

  // Evento para cargar más Pokémon al hacer clic
  loadMoreBtn.addEventListener("click", loadMorePokemon);
});
