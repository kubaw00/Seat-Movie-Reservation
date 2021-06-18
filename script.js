const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


populateUI();


let ticketPrice = +movieSelect.value;






function setMovieData(movieIndex){
        localStorage.setItem('selectedMovieIndex', movieIndex)
        
}

function updateSelectedCount(){
    
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map((seat)=> [...seats].indexOf(seat))
    

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    count.textContent = selectedSeatsCount;
    total.textContent = selectedSeatsCount*ticketPrice;
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) >-1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex)
    updateSelectedCount()
})

container.addEventListener('click', e => {
    if(e.target.className === 'seat' || e.target.className === 'seat selected'){
        e.target.classList.toggle('selected')
    }
    updateSelectedCount()
})

updateSelectedCount()