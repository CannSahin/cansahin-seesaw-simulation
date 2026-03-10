# Seesaw Simulation

An interactive seesaw simulation built with pure JavaScript, HTML, and CSS, focusing on torque mechanics, weight distribution, animations, sound effects, and persistent game state.

## 🎮 Live Demo

You can play the simulation directly here: [https://cannsahin.github.io/cansahin-seesaw-simulation/](https://cannsahin.github.io/cansahin-seesaw-simulation/)
Or you can download the project and open the `index.html` file in any browser.
You can watch the technical walkthrough of the project here:https://youtu.be/hyMJxbb1btw

## 🕹️ How to Use

1. **Next Weight:** When the page loads, a random weight (1–10 kg) is shown in the "Next Weight" stat card.
2. **Drop:** Click on the seesaw plank to drop the weight at that position.
3. **Balance:** The plank tilts based on the torque balance between both sides.
4. **Next Step:** A new random weight is generated immediately after each drop.
5. **Reset:** Click the **Reset** button to clear the board and start over.
6. **Persistence:** Refresh the page — your weights are still there, saved automatically via `localStorage`.

## 🧠 Idea & Thinking Process

Before writing any code, I sketched out two main sections: a stats panel to show live data, and a simulation area with the plank and pivot.
I started with the HTML structure and CSS layout, then made the plank clickable. The first milestone was getting a weight to appear where the user clicked.
After that, I focused on the physics: calculating torque on each side and converting the difference into a visible rotation angle. This required several iterations to feel natural — too sensitive and it looked chaotic, 
too slow and it felt unresponsive. Once the physics were stable, I added localStorage so the state persists on refresh. Finally, I layered in the falling animation and sound effects 
to make each drop feel satisfying.

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (Flexbox, CSS Animations, CSS Custom Properties)
- **Vanilla JavaScript** (Web Audio API, `localStorage`, DOM Events)

## ⚙️ Difficult Parts

### 1. Torque → Angle Conversion
Translating raw torque numbers into a visible, stable rotation angle was harder than expected. I tried normalizing by plank length first, but results were unstable and looked unnatural. Dividing the net torque difference by a constant (`/ 10`) and clamping the result between `-30°` and `+30°` gave the most controlled and satisfying feel.

### 2. Sound Timing
Playing the landing sound immediately on click felt wrong — it fired before the box visually reached the plank. The fix was attaching the sound to the `animationend` event so it triggers at the exact frame the falling animation completes.

### 3. State Rebuild on Refresh
On reload, every weight must be redrawn and the entire torque/angle state must be recalculated from scratch using only the JSON stored in `localStorage`. Getting `loadData()` to correctly restore a complex visual state — positions, sizes, colors, and tilt angle — required careful ordering of function calls.

## ⚠️ Trade-offs & Limitations

- **Measurement:** Distance is measured in pixels, not real-world units — so physics behavior can slightly vary with screen width.
- **Clamping:** Angle is clamped at `±30°` — extreme weight imbalance is not fully represented visually.
- **Physics Constants:** Torque divisor (`/ 10`) is a manually tuned constant, not derived from real physics.

## 📚 Concepts I Researched & Learned

- **`animationend` event:** A browser event that fires exactly when a CSS `@keyframes` animation finishes. Used this to trigger the landing sound at the precise moment the box hits the plank.
- **`transform-origin: 50% 100%`:** Makes the plank rotate from its bottom-center (the pivot point) instead of its geometric center.
- **`repeating-linear-gradient`:** CSS technique to draw a ruler-like grid on the plank without any extra HTML elements.
- **`flex-wrap: wrap`:** Used to display the stat label and value on two lines inside a fixed-size circle.
- **Web Audio API:** Researched how to handle multiple audio layers (woosh and impact sounds) for web browsers.

## 🧩 Function Descriptions

### 🔊 Audio
- `wooshSound` 👉 Plays on every drop, triggered immediately on click.
- `landSound` 👉 Plays when the falling animation ends, synced to visual impact.

### 🎮 Simulation Control
- `generateNextWeight()` 👉 Picks a random 1–10 kg weight and updates the preview card.

### 🧮 Physics & Balance
- `calculateBalance()` 👉 Computes torques, updates stat cards, rotates the plank.

### 🎨 Visual Object Creation
- `applyStyleToBox(div, weight)` 👉 Sets the size and unique color of a weight element.
- `drawBox(obj, isNew)` 👉 Creates a weight DOM element and places it on the plank.

### 💾 Persistence
- `saveData()` 👉 Writes placed objects to `localStorage`.
- `loadData()` 👉 Restores placed objects and balance from `localStorage`.

## ⚛️ Physics & Formulas

- **Drop Position:** `position = clickX - (screenWidth / 2)`
- **Torque:** `leftTorque += weight × |position|` (negative position = left side), `rightTorque += weight × position` (positive position = right side).
- **Tilt Angle:** `angle = clamp((rightTorque - leftTorque) / 10, -30, 30)`
- **Weight Size:** `size (px) = 30 + (weight - 1) × 5` (Range: 30px – 75px)
- **Random Weight:** `weight = floor(random() * 10) + 1`

## 🤖 AI Usage

- I used AI to understand **Web Audio API** and **animationend** event.
- AI helped me compare torque calculation methods for deciding distance normalization (pixels vs. meters).
- I used a VS Code AI plugin for syntax and code support.
- AI helped me organize and format the final README structure.

## 💭 Closing Thoughts

It was a long and challenging journey for me.I learned so many new things such as physics simulation, sound timing, CSS animations, and localStorage. 
Every bug pushed me to understand the browser deeper. I'm proud of what this small project became. I hope you will like the project and enjoy it in every part like me!

