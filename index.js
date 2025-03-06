import { characters } from "./constants.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".cards-container");

    characters.forEach(character => {
        const card = document.createElement("div");
        card.classList.add("hover-flip-card");
        card.innerHTML = `
            <div class="card-inner" id="${character.id}">
                <div class="card-front"></div>
                <div class="card-back">
                    <div class="card-back-info" data-aos="zoom-out-down" data-aos-delay="200">
                        <h4>${character.name}</h4>
                        <p>${character.description}</p>
                    </div>
                </div>
            </div>
        `;

        // Click event to toggle only the clicked card
        card.addEventListener("click", () => {
            card.querySelector(".card-inner").classList.toggle("flipped");
        });

        container.appendChild(card);
    });
});
