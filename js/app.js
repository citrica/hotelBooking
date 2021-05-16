// Declaración de variable con datos de la reserva
var bookingData = {
    nightNumber: 0,
    roomType: 'standard',
    roomCapacity: 'single',
    parking: 0,
    spa: false,
}

// Función para cargar los datos introducidos en la reserva
var booking = (bookingData) => {
    bookingData.nightNumber = parseInt(document.getElementById("input-night-number").value);
    bookingData.roomType = document.getElementById("input-room-type").value;
    bookingData.roomCapacity = document.getElementById("input-room-capacity").value;
    bookingData.parking = parseInt(document.getElementById("input-parking-nights").value);
    bookingData.spa = document.getElementById("input-spa").checked;
    if (isNaN(bookingData.nightNumber)) bookingData.nightNumber = 0;
    if (isNaN(bookingData.parking)) bookingData.parking = 0;
}

// Habitación por noche: Standar = 100€ / Junior suite = 120€ / Suite = 150€
var priceNights = (nightNumber, roomType, spa) => {
    var price = 0;
    switch (roomType) {
        case 'standard':
            price = nightNumber * (100 + priceSpa(spa));
            break;
        case 'juniorSuite':
            price = nightNumber * (120 + priceSpa(spa));
            break;
        case 'suite':
            price = nightNumber * (150 + priceSpa(spa));
            break;
    }
    return price;
}

// Spa = +20€ precio habitación por noche
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
var priceParking = (parking) => parking * 10;

var totalPrice = (bookingData) => {
    var total = 0;
    booking(bookingData);
    if (bookingData.nightNumber !== 0) {
        total = (priceNights(bookingData.nightNumber, bookingData.roomType, bookingData.spa) *
            capacity(bookingData.roomCapacity)) + priceParking(bookingData.parking);
    } else {
        total = 0;
    }
    return document.getElementById("price").innerText = total + ' €';
}

//Eventos
document.getElementById("input-night-number").addEventListener("input", totalPrice);
document.getElementById("input-room-type").addEventListener("click", totalPrice);
document.getElementById("input-spa").addEventListener("input", totalPrice);
document.getElementById("input-room-capacity").addEventListener("click", totalPrice);
document.getElementById("input-parking-nights").addEventListener("input", totalPrice);