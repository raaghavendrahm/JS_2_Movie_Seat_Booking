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

  // 'selectedSeats' will be a nodeList of selected elements (seats). It must be converted to a regular array to form an index of it. This can be done with spread operator:
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // console.log(seatsIndex);

  // Local Storage:
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // This stores selected seats on local storage (but not on UI yet).

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;

  total.innerText = selectedSeatsCount * ticketPrice;
};

// Save selected movie index and price:
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
  // So, now if a movie and seats for it are selected, then the data for 'selectedSeats', 'selectedMovieIndex', and 'selectedMoviePrice' are stored in local storage. On reload, the data persists in the browser. Next, it must be reflected in the UI.
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
  // console.log(e.target.selectedIndex, e.target.value);
  // In the above, 'selectedIndex' is the index of the movie selected. If 'Joker' is selected then 'selectedIndex' is '1' and if 'The Lion King' is selected, then 'selectedIndex' is '3'. And, 'value' is the ticket price. So, if 'The Lion King' is selected, then the 'selectedIndex' is '3', and the 'value' is '12'. So, these two shall be saved to local storage using 'setMovieData' function:
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
