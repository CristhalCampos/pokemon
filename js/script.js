//Ejecutar luego de cargar la pagina
window.addEventListener('load', () => {
  //Espera que cargue la respuesta de la API
  let loadingPokemon = false;
  let loadingSearch = false;

  async function translate(text, targetLang = "es") {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error("Error en la traducción:", error);
    }
  }

  //Función para obtener los datos de un Pokémon por su ID
  async function getPokemonData(id) {
    loadingPokemon = true; //Iniciamos el estado de carga
    const container = document.getElementById(`pokemon-${id}`);
    const p = document.createElement("p");
    p.id = `pokemon-${id}-loading`;
    p.textContent = "Cargando...";
    container.appendChild(p);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      const data = await response.json();
      //Almacena los datos obtenidos
      const pokemon = {
        name: data.name,
        image: data.sprites.front_default,
        //Pasar a la función translate los tipos para que sean en español
        types: await Promise.all(data.types.map(type => translate(type.type.name))),
        //types: data.types.map(type => type.type.name),
        abilities: data.abilities.map(ability => ability.ability.name),
        stats: data.stats.map(stat => ({ name: stat.stat.name, baseStat: stat.base_stat })),
      }
      //Llamar a la función para mostrar estos datos en el HTML
      updatePokemonHTML(id, pokemon);
    } catch (error) {
      console.error("Error al obtener datos del Pokemon:", error);
    }
  }

  // Función para mostrar los datos en el HTML
  function updatePokemonHTML(id, pokemon) {
    const pokemonElement = document.getElementById(`pokemon-${id}`);
    const nameElement = document.createElement("h3");
    nameElement.textContent = pokemon.name;
    pokemonElement.appendChild(nameElement);

    const imageElement = document.createElement("img");
    imageElement.src = pokemon.image;
    pokemonElement.appendChild(imageElement);

    const typesElement = document.createElement("p");
    typesElement.textContent = `Tipos: ${pokemon.types.join(', ')}`;
    pokemonElement.appendChild(typesElement);

    const abilitiesElement = document.createElement("p");
    abilitiesElement.textContent = `Habilidades: ${pokemon.abilities.join(', ')}`;
    pokemonElement.appendChild(abilitiesElement);

    const divElement = document.createElement("div");
    pokemonElement.appendChild(divElement);
    //Asigna las estadísticas
    pokemon.stats.forEach(stat => {
      const statItem = document.createElement("p");
      statItem.textContent = `${stat.name}: ${stat.baseStat}`;
      divElement.appendChild(statItem);
    });

    loadingPokemon = false; //Finaliza el estado de carga
    //Elimina el elemento de carga
    const loadingElementPokemon = document.getElementById(`pokemon-${id}-loading`);
    pokemonElement.removeChild(loadingElementPokemon);

    loadingSearch = false; //Finaliza el estado de carga
    //Elimina el elemento de carga si la propiedad css del contenedor pokemon-0 es block
    if (pokemonElement.style.display === "block") {
      const loadingElementSearch = document.getElementById(`pokemon-0-loading`);
      pokemonElement.removeChild(loadingElementSearch);
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

        //Verificar que no hay un pokemon en el contenedor pokemon-0
        if (container.style.display === "block") {
          //Elimina los elementos hijos del contenedor pokemon-0
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
          document.getElementById("load-more-1").style.display = "none";
          updatePokemonHTML(0, pokemon);
        } else {
          //Cambiar propiedad css de los contenedores de los otros pokemon
          for (let i = 1; i <= 8; i++) {
            const container = document.getElementById(`pokemon-${i}`);
            container.style.display = "none";
          }
          //Cambiar propiedad css del contenedor pokemon-0
          container.style.display = "block";
          //Llamar a la funcion para mostrar estos datos en el HTML
          document.getElementById("load-more-1").style.display = "none";
          updatePokemonHTML(0, pokemon);
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

  //Llamar a la función para obtener los primeros 6 Pokemon por ID
  for (let i = 1; i <= 8; i++) {
    getPokemonData(i);
  }

  document.getElementById("load-more-1").addEventListener("click", () => {
    for (let i = 9; i <= 16; i++) {
      //Crea un contenedor para cada Pokemon
      const container = document.createElement("div");
      container.classList.add("pokemon");
      container.id = `pokemon-${i}`;
      document.getElementById("pokemon-container").appendChild(container);
      getPokemonData(i);
    }
    //Eliminar boton de mostrar mas
    document.getElementById("load-more-1").remove();
    //Crear boton de mostrar mas
    const button = document.createElement("button");
    button.id = `load-more-2`;
    button.textContent = "Ver mas";
    document.getElementById("more").appendChild(button);
    document.getElementById("load-more-2").addEventListener("click", () => {
      for (let i = 17; i <= 24; i++) {
        //Crea un contenedor para cada Pokemon
        const container = document.createElement("div");
        container.classList.add("pokemon");
        container.id = `pokemon-${i}`;
        document.getElementById("pokemon-container").appendChild(container);
        getPokemonData(i);
      }
      //Eliminar boton de mostrar mas
      document.getElementById("load-more-2").remove();
    });
  });
});