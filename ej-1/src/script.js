document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const cards = document.querySelector("#card-dinamica");
const templateCard = document.querySelector("#template-card").content;

const fetchData = async () => {
    try {
        loadingData(true);

        const res = await fetch("https://rickandmortyapi.com/api/character");
        const data = await res.json();

        showData(data);
    } catch (error) {
        console.log(error);
    } finally {
        loadingData(false);
    }
};

const loadingData = (estado) => {
    const loading = document.querySelector("#loading");
    if (estado) {
        loading.classList.remove("d-none");
    } else {
        loading.classList.add("d-none");
    }
};

const showData = (data) => {
    const fragment = document.createDocumentFragment();
    cards.textContent = "";

    data.results.forEach((item) => {
        const clone = templateCard.cloneNode(true);
        
        // Asignamos todos los campos requeridos por la rúbrica del profesor
        clone.querySelector("img").setAttribute("src", item.image);
        clone.querySelector(".card-title").textContent = item.name;
        clone.querySelector(".span-status").textContent = item.status;
        clone.querySelector(".span-species").textContent = item.species;
        clone.querySelector(".span-gender").textContent = item.gender;
        clone.querySelector(".span-origin").textContent = item.origin.name;

        fragment.appendChild(clone);
    });

    cards.appendChild(fragment);
};