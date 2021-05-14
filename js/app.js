// Declaración de variable con datos de la reserva
var bookingData = {
    nightNumber: 0,
    roomType: 'standard',
    roomCapacity: 'single',
    parkingNumber: 0,
    spa: false,
}

// Función para cargar los datos introducidos en la reserva
var booking = (bookingData) => {
    bookingData.nightNumber = parseInt(document.getElementById("input-night-number").value);
    bookingData.roomType = document.getElementById("input-room-type").value;
    bookingData.roomCapacity = document.getElementById("input-room-capacity").value;
    bookingData.parkingNumber = parseInt(document.getElementById("input-parking-nights").value);
    bookingData.spa = document.getElementById("input-spa").checked;
}

// Habitación por noche: Standar = 100€ / Junior suite = 120€ / Suite = 150€
var priceNights = (nightNumber, roomType) => {
    var price = 0;
    switch (roomType) {
        case 'standard':
            price = nightNumber * 100;
            break;
        case 'juniorSuite':
            price = nightNumber * 120;
            break;
        case 'suite':
            price = nightNumber * 150;
            break;
    }
    return price;
}

// Spa = 20€
var priceSpa = (spa) => spa === true ? 20 : 0;

// Capaity: Individual -25% / Triple +25%
var capacity = (roomCapacity) => {
    var factor = 1;
    switch (roomCapacity) {
        case 'single':
            factor = 0.75;
            break;
        case 'triple':
            factor = 1.25;
            break;
    }
    return factor;
}

// Noche de parking = 10€
var priceParking = (parkingNumber) => parkingNumber * 10;

var totalPrice = (bookingData) => {
    var total = 0;
    booking(bookingData);
    total = ((priceNights(bookingData.nightNumber, bookingData.roomType) + priceSpa(bookingData.spa)) *
        capacity(bookingData.roomCapacity)) + priceParking(bookingData.parkingNumber);
    return document.getElementById("input-total-price").value = total + ' €';
}

//Eventos
document.getElementById("total-price").addEventListener("click", totalPrice);