window.addEventListener('load', () => {
  async function loadPokemonFeatured() {
    const container = document.querySelector(".pokemon-wrapper");
  
    const pokemonFeatured = [32, 274, 286, 314, 628, 759, 825, 897, 991];
  
    for (const id of pokemonFeatured) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
  
        const containerPokemon = document.createElement("div");
        containerPokemon.classList.add("featured");
  
        const numberElement = document.createElement("p");
        numberElement.textContent = `#${data.id}`;
        numberElement.classList.add("number");

        const nameElement = document.createElement("h3");
        nameElement.textContent = data.name;
        nameElement.classList.add("name");
  
        const imageElement = document.createElement("img");
        imageElement.src = data.sprites.front_default;
        imageElement.alt = data.name;
  
        const typesContainer = document.createElement("div");
        data.types.forEach(type => {
          const typeTag = document.createElement("div");
          typeTag.classList.add("type-tag", type.type.name);
          const typeElement = document.createElement("p");
          typeElement.textContent = type.type.name;
          typesContainer.appendChild(typeTag);
          typeTag.appendChild(typeElement);
        })
        
        containerPokemon.appendChild(numberElement);
        containerPokemon.appendChild(nameElement);
        containerPokemon.appendChild(imageElement);
        containerPokemon.appendChild(typesContainer);
  
        container.appendChild(containerPokemon);
      } catch (error) {
        console.error(`Error al obtener Pokémon:`, error);
      }
    }
  
    setupSlider();
  }
  
  function setupSlider() {
    const container = document.querySelector(".pokemon-wrapper");
    const btnNext = document.querySelector(".btn-next");
    const btnPrev = document.querySelector(".btn-prev");
  
    let pokemonItems = document.querySelectorAll(".featured");
    let index = 0; // Índice del Pokémon seleccionado
  
    function updateSlider() {
      pokemonItems.forEach((item, i) => {
        item.classList.remove("selected");
        item.style.transform = `scale(1)`;
      });
  
      pokemonItems[index].classList.add("selected");
      pokemonItems[index].style.transform = `scale(1.2)`;
      container.style.transform = `translateX(-${index * 110}px)`;
    }
  
    btnNext.addEventListener("click", () => {
      index = (index + 1) % pokemonItems.length; // Reinicia al llegar al último
      updateSlider();
    });
  
    btnPrev.addEventListener("click", () => {
      index = (index - 1 + pokemonItems.length) % pokemonItems.length; // Va al último si es el primero
      updateSlider();
    });
  
    updateSlider(); // Iniciar con el primer Pokémon seleccionado
  }
  
  loadPokemonFeatured();
})