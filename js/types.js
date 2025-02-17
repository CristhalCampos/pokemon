// Ejecutar luego de cargar la pagina
window.addEventListener('load', () => {
  const pokemonTypes = [
    "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"
  ];

  // Crear los botones para cada tipo de Pokémon
  const btnsContainer = document.getElementById("types-container");

  pokemonTypes.forEach(type => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.id = type;
    button.textContent = type;
    const anchor = document.createElement("a");
    anchor.href = `./${type}.html`;  // Enlace hacia la página correspondiente
    anchor.appendChild(button);
    btnsContainer.appendChild(anchor);
  });

  const btnBug = document.getElementById("bug");
  const bug = document.createElement("i");
  bug.classList.add("fa-solid");
  bug.classList.add("fa-bug");
  btnBug.appendChild(bug);

  const btnDark = document.getElementById("dark");
  const dark = document.createElement("i");
  dark.classList.add("fa-solid");
  dark.classList.add("fa-moon");
  btnDark.appendChild(dark);

  const btnDragon = document.getElementById("dragon");
  const dragon = document.createElement("i");
  dragon.classList.add("fa-solid");
  dragon.classList.add("fa-dragon");
  btnDragon.appendChild(dragon);

  const btnElectric = document.getElementById("electric");
  const electric = document.createElement("i");
  electric.classList.add("fa-solid");
  electric.classList.add("fa-bolt");
  btnElectric.appendChild(electric);

  const btnFairy = document.getElementById("fairy");
  const fairy = document.createElement("i");
  fairy.classList.add("fa-solid");
  fairy.classList.add("fa-wand-magic-sparkles");
  btnFairy.appendChild(fairy);

  const btnFighting = document.getElementById("fighting");
  const fighting = document.createElement("i");
  fighting.classList.add("fa-solid");
  fighting.classList.add("fa-fist-raised");
  btnFighting.appendChild(fighting);

  const btnFire = document.getElementById("fire");
  const fire = document.createElement("i");
  fire.classList.add("fa-solid");
  fire.classList.add("fa-fire");
  btnFire.appendChild(fire);

  const btnFlying = document.getElementById("flying");
  const flying = document.createElement("i");
  flying.classList.add("fa-solid");
  flying.classList.add("fa-dove");
  btnFlying.appendChild(flying);

  const btnghost = document.getElementById("ghost");
  const ghost = document.createElement("i");
  ghost.classList.add("fa-solid");
  ghost.classList.add("fa-ghost");
  btnghost.appendChild(ghost);

  const btnGrass = document.getElementById("grass");
  const grass = document.createElement("i");
  grass.classList.add("fa-solid");
  grass.classList.add("fa-leaf");
  btnGrass.appendChild(grass);

  const btnGround = document.getElementById("ground");
  const ground = document.createElement("i");
  ground.classList.add("fa-solid");
  ground.classList.add("fa-earth-americas");
  btnGround.appendChild(ground);

  const btnIce = document.getElementById("ice");
  const ice = document.createElement("i");
  ice.classList.add("fa-solid");
  ice.classList.add("fa-snowflake");
  btnIce.appendChild(ice);

  const btnNormal = document.getElementById("normal");
  const normal = document.createElement("i");
  normal.classList.add("fa-solid");
  normal.classList.add("fa-user");
  btnNormal.appendChild(normal);

  const btnPoison = document.getElementById("poison");
  const poison = document.createElement("i");
  poison.classList.add("fa-solid");
  poison.classList.add("fa-flask");
  btnPoison.appendChild(poison);

  const btnPsychic = document.getElementById("psychic");
  const psychic = document.createElement("i");
  psychic.classList.add("fa-solid");
  psychic.classList.add("fa-brain");
  btnPsychic.appendChild(psychic);

  const btnRock = document.getElementById("rock");
  const rock = document.createElement("i");
  rock.classList.add("fa-solid");
  rock.classList.add("fa-mountain");
  btnRock.appendChild(rock);

  const btnSteel = document.getElementById("steel");
  const steel = document.createElement("i");
  steel.classList.add("fa-solid");
  steel.classList.add("fa-robot");
  btnSteel.appendChild(steel);

  const btnWater = document.getElementById("water");
  const water = document.createElement("i");
  water.classList.add("fa-solid");
  water.classList.add("fa-water");
  btnWater.appendChild(water);
});