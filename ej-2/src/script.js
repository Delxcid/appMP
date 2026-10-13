let allPokemonData = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchPokemonData();

    // Evento para el Buscador
    document.querySelector("#inputSearch").addEventListener("keyup", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allPokemonData.filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchTerm)
        );
        displayPokemon(filtered);
    });

    // Evento para el Filtro por Tipo
    document.querySelector("#selectType").addEventListener("change", (e) => {
        const selectedType = e.target.value;
        if (selectedType === "") {
            displayPokemon(allPokemonData);
        } else {
            const filtered = allPokemonData.filter(pokemon => 
                pokemon.types.includes(selectedType)
            );
            displayPokemon(filtered);
        }
    });
});

const fetchPokemonData = async () => {
    try {
        const loadingEl = document.querySelector("#loading");
        loadingEl.style.display = "block";

        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await res.json();

        const pokemonPromises = data.results.map(async (item) => {
            const resDetails = await fetch(item.url);
            const details = await resDetails.json();
            return {
                id: details.id,
                name: details.name,
                image: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
                types: details.types.map(t => t.type.name)
            };
        });

        allPokemonData = await Promise.all(pokemonPromises);
        loadingEl.style.display = "none";
        displayPokemon(allPokemonData);

    } catch (error) {
        console.log("Error al obtener los datos:", error);
    }
};

const displayPokemon = (pokemons) => {
    const container = document.querySelector("#card-container");
    const template = document.querySelector("#template-card").content;
    const fragment = document.createDocumentFragment();

    container.innerHTML = "";

    if (pokemons.length === 0) {
        container.innerHTML = `<p class="text-center text-warning">No se encontraron Pokémon.</p>`;
        return;
    }

    pokemons.forEach(pokemon => {
        const clone = template.cloneNode(true);
        clone.querySelector(".pokemon-img").setAttribute("src", pokemon.image);
        clone.querySelector(".pokemon-name").textContent = pokemon.name;
        clone.querySelector(".pokemon-type").textContent = pokemon.types.join(", ");
        clone.querySelector(".pokemon-id").textContent = `#${pokemon.id}`;

        fragment.appendChild(clone);
    });

    container.appendChild(fragment);
};