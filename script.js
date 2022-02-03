// Grabbing the required elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // grabs the seats that are not occupied
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');
let ticketPrice = +movieSelect.value; // "+" is same as using parseInt(). And 'let' is used as it will be changing w.r.t the movie selected.

// FUNCTIONS

// Update total and count
const updateSelectedCount = () => {
  // This counts all the selected seats and updates the text

  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;

  total.innerText = selectedSeatsCount * ticketPrice;
};

// EVENT LISTENERS

// Seat click event
container.addEventListener('click', (e) => {
  // If a selected seat does have 'seat' class and doesn't have 'occupied' class (seats that are unoccupied), then add 'selected' class to it:
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected'); // instead of using 'add', 'toggle' is used as on clicking 'selected' class to be added and on clicking again, it shall be removed.

    // To count the selected seats and update the text:
    updateSelectedCount();
  }
});

// Movie select event
// We need 'change' event for this:
movieSelect.addEventListener('change', (e) => {
  // To update the ticket price when a different movie is selected:
  ticketPrice = +e.target.value;
  updateSelectedCount();
});
