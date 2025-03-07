document.addEventListener("DOMContentLoaded", () => {
    // Character Data
    const characters = [
        { id: "zenitsu", name: "Zenitsu Agatsuma", description: "A cowardly yet powerful Demon Slayer, Zenitsu uses Thunder Breathing with immense speed." },
        { id: "inosuke", name: "Inosuke Hashibira", description: "A wild and fearless fighter, Inosuke wields dual serrated swords and uses Beast Breathing." },
        { id: "tanjiro", name: "Tanjiro Kamado", description: "A kind-hearted Demon Slayer with a strong sense of justice, mastering Water and Sun Breathing." },
        { id: "nezuko", name: "Nezuko Kamado", description: "Tanjiro’s demon sister who fights to protect humans, using Blood Demon Art: Exploding Blood." },
        { id: "giyu", name: "Giyu Tomioka", description: "The Water Hashira, known for his calm demeanor and mastery of Water Breathing techniques." }
    ];

    // Lore Background Data
    const loreBackgrounds = {
        slayers: [
            "./images/backgrounds/slayers/pillar-meeting.jpg",
            "./images/backgrounds/slayers/snowy-forest-giyu.jpg",
            "./images/backgrounds/slayers/wisteria-forest-tanjiro.jpg",
            "./images/backgrounds/slayers/hashiras-hallway.jpg",
            "./images/backgrounds/slayers/hashira-back-view.jpg",
            "./images/backgrounds/slayers/ubayashiki-fam.jpg",
        ],
        demons: [
            "./images/backgrounds/demons/infinity-castle.jpg",
            "./images/backgrounds/demons/upper-moon-3-1.jpg",
            "./images/backgrounds/demons/upper-moons-eyes.jpg",
            "./images/backgrounds/demons/um-3-2.jpeg",
            "./images/backgrounds/demons/muzan-grab.png",
            "./images/backgrounds/demons/biwa-demon-flip.jpg",
        ]
    };



    //watch trailer btn
    const trailerBtn = document.getElementById("watch-trailer-btn");
    const overlay = document.getElementById("trailer-overlay");
    const videoFrame = document.getElementById("trailer-video");
    const closeBtn = document.getElementById("close-trailer");
    const trailerURL = "https://www.youtube.com/embed/VQGCKyvzIM4?autoplay=1"; // Replace YOUR_TRAILER_ID with the YouTube video ID
    // Open Modal
    trailerBtn.addEventListener("click", () => {
        videoFrame.src = trailerURL;
        overlay.classList.add("show");
    });
    // Close Modal
    closeBtn.addEventListener("click", () => {
        videoFrame.src = ""; // Stop video when closed
        overlay.classList.remove("show");
    });
    // Click outside modal to close
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            videoFrame.src = "";
            overlay.classList.remove("show");
        }
    });


    // Card Container
    const container = document.querySelector(".cards-container");
    characters.forEach((character, index) => {
        const card = document.createElement("div");
        card.classList.add("hover-flip-card");
        card.innerHTML = `
            <div class="card-inner" id="${character.id}">
                <div class="card-front" data-aos="fade-up" data-aos-delay="${(index + 1) * 300}"></div>
                <div class="card-back">
                    <div class="card-back-info" data-aos="zoom-out-down" data-aos-delay="100">
                        <h4>${character.name}</h4>
                        <p>${character.description}</p>
                    </div>
                </div>
            </div>
        `;
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
    let lastBackground = { slayers: null, demons: null };

    setTimeout(() => { doorTransition.classList.add("open"); }, 1000);

    function getRandomBackground(view) {
        const backgrounds = loreBackgrounds[view];
        if (!backgrounds.length) return "./images/default.jpg";
        
        const availableBackgrounds = backgrounds.filter(bg => bg !== lastBackground[view]);
        if (availableBackgrounds.length === 0) availableBackgrounds.push(lastBackground[view]);

        const newBg = availableBackgrounds[Math.floor(Math.random() * availableBackgrounds.length)];
        lastBackground[view] = newBg;
        return newBg;
    }

    function togglePerspective() {
        isDemonView = !isDemonView;
        sound.currentTime = 0.25;
        sound.play();
        doorTransition.classList.remove("open");

        setTimeout(() => {
            const newBg = getRandomBackground(isDemonView ? "demons" : "slayers");
            loreSection.style.backgroundImage = `url('${newBg}')`;
            title.textContent = isDemonView ? "The Demon’s Curse" : "The Slayer’s Struggle";
            content.textContent = isDemonView
                ? 'Demons were once humans, twisted by fate and the blood of Muzan Kibutsuji, the first demon. While some embrace their monstrous hunger, others are tormented by the memories of the lives they lost. Trapped in eternal night, demons like Rui and Akaza reveal the sorrowful pasts that led them to this existence—where strength is their only salvation, and despair fuels their rage. In their eyes, survival is a curse, and power is the only solace. The line between good and evil blurs as they struggle against the inevitable pull of their demonic instincts, reminding us that even monsters were once human.'
                : 'The Demon Slayer Corps is a secretive organization sworn to protect humanity from the bloodthirsty demons lurking in the shadows. In Taishō-era Japan, Tanjiro Kamado, a kind-hearted boy, finds his world shattered when a demon slaughters his family—leaving only his sister, Nezuko, who has been transformed into a demon. Fueled by vengeance and love, Tanjiro trains rigorously in the art of Water Breathing and joins the corps, embarking on a perilous quest to hunt demons and seek a cure for Nezuko. Alongside fierce warriors, each carrying their own tragic pasts, he faces relentless battles that test his spirit, determination, and humanity. Their fight is not just against demons but against the darkness that lurks within.';

            setTimeout(() => { doorTransition.classList.add("open"); }, 200);
        }, 0);
    }

    toggleBtn.addEventListener("click", togglePerspective);
    setInterval(togglePerspective, 20000);
});
 