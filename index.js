import { characters, loreBackgrounds } from "./constants.js";

document.addEventListener("DOMContentLoaded", () => {
    // Card Container
    const container = document.querySelector(".cards-container");

    // Create character cards
    characters.forEach((character) => {
        const card = document.createElement("div");
        card.classList.add("hover-flip-card");
        card.innerHTML = `
            <div class="card-inner" id="${character.id}">
                <div class="card-front"></div>
                <div class="card-back">
                    <div class="card-back-info" data-aos="zoom-out-down" data-aos-delay="100">
                        <h4>${character.name}</h4>
                        <p>${character.description}</p>
                    </div>
                </div>
            </div>
        `;

        // Toggle only the clicked card
        card.addEventListener("click", () => {
            card.querySelector(".card-inner").classList.toggle("flipped");
        });

        container.appendChild(card);
    });

    // Lore Section Elements
    const toggleBtn = document.getElementById("toggle-perspective");
    const loreSection = document.getElementById("lore");
    const title = document.getElementById("perspective-title");
    const content = document.getElementById("perspective-content");
    const sound = document.getElementById("toggle-sound");
    const doorTransition = document.querySelector(".door-transition");

    let isDemonView = false;

    // Start with doors closed, then open after page loads
    setTimeout(() => {
        doorTransition.classList.add("open");
    }, 1000);

    // Function to get a random background
    let lastBackground = { slayers: null, demons: null };

function getRandomBackground(view) {
    const backgrounds = loreBackgrounds[view];
    if (!backgrounds || backgrounds.length === 0) return "./images/default.jpg"; // Fallback image

    // Filter out the last used background
    const availableBackgrounds = backgrounds.filter(bg => bg !== lastBackground[view]);

    // If all backgrounds were used (only one left), allow it
    if (availableBackgrounds.length === 0) availableBackgrounds.push(lastBackground[view]);

    // Pick a new random background
    const newBg = availableBackgrounds[Math.floor(Math.random() * availableBackgrounds.length)];

    // Store the chosen background as the last used one
    lastBackground[view] = newBg;

    return newBg;
}


    // Toggle Perspectives Function
    function togglePerspective() {
        isDemonView = !isDemonView;

        // Play Sound Effect
        sound.currentTime = 0.25;
        sound.play();

        // Close Doors Before Switching Perspective
        doorTransition.classList.remove("open");

        setTimeout(() => {
            // Get a random background for the new perspective
            const newBg = getRandomBackground(isDemonView ? "demons" : "slayers");
            loreSection.style.backgroundImage = `url('${newBg}')`;

            // Change Title & Content
            title.textContent = isDemonView ? "The Demon’s Curse" : "The Slayer’s Struggle";
            content.textContent = isDemonView
                ? 'Demons were once humans, twisted by fate and the blood of Muzan Kibutsuji, the first demon. While some embrace their monstrous hunger, others are tormented by the memories of the lives they lost. Trapped in eternal night, demons like Rui and Akaza reveal the sorrowful pasts that led them to this existence—where strength is their only salvation, and despair fuels their rage. In their eyes, survival is a curse, and power is the only solace. The line between good and evil blurs as they struggle against the inevitable pull of their demonic instincts, reminding us that even monsters were once human.'
                : 'The Demon Slayer Corps is a secretive organization sworn to protect humanity from the bloodthirsty demons lurking in the shadows. In Taishō-era Japan, Tanjiro Kamado, a kind-hearted boy, finds his world shattered when a demon slaughters his family—leaving only his sister, Nezuko, who has been transformed into a demon. Fueled by vengeance and love, Tanjiro trains rigorously in the art of Water Breathing and joins the corps, embarking on a perilous quest to hunt demons and seek a cure for Nezuko. Alongside fierce warriors, each carrying their own tragic pasts, he faces relentless battles that test his spirit, determination, and humanity. Their fight is not just against demons but against the darkness that lurks within.';

            // Open Doors After Delay
            setTimeout(() => {
                doorTransition.classList.add("open");
            }, 200);
        }, 0);
    }

    // Attach click event to button
    toggleBtn.addEventListener("click", togglePerspective);

    // Auto-toggle every 30 seconds
    setInterval(togglePerspective, 20000);
});
