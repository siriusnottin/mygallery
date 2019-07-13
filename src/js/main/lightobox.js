/*jshint esversion: 6 */

// Get the body of the page
const body = document.querySelector(`body`);
// Get all of the images
const images = document.querySelectorAll(`.gallery img`);

// For each image add an event
// Bind the image to the event function
images.forEach(image =>
	image.addEventListener(`click`, openOverlay.bind(image))
);

// Create a function for what the event should do
function openOverlay() {
	// Create markup for an overlay with an image
	// Use `this` for the image
	const overlayMarkup = `<div id="overlay">
		<figure>
			${this.outerHTML}
			<figcaption>${this.alt}</figcaption>
		</figure>
	</div>`;

	// Add the overlay before the closing of the body tag
	body.insertAdjacentHTML(`beforeend`, overlayMarkup);

	// Get the overlay from the page
	const overlay = document.querySelector(`#overlay`);

	// Add an event to the overlay when clicked
	overlay.addEventListener(`click`, listenForCloseClick);

	// Add an event for whenever a key is pressed
	document.addEventListener(`keyup`, listenForCloseKeypress);
}

// Create a function for what the overlay click event should do
function listenForCloseClick(event) {
	if (event.target.id == "overlay") {
		closeModal();
	}
}

// Create a function for what the key press event should do
function listenForCloseKeypress(event) {
	if (event.key === "Escape") {
		closeModal();
	}
}

// Create a function to remove the overlay (and events)
function closeModal() {
	// Get the overlay from the page
	const overlay = document.querySelector(`#overlay`);

	// Remove the overlay from the page
	overlay.outerHTML = ``;

	// Remove the event on keyup
	document.removeEventListener(`keyup`, listenForCloseKeypress);
}