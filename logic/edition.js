let carId = localStorage.getItem('id');
let carName = document.querySelector('#nameField');
let carPrice = document.querySelector('#priceField');
let carImage = document.querySelector('#imgField');

function toMainPage() {
    window.location.href = 'index.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

async function getCar(id) {
    fetch(`https://632032139f82827dcf26f6c9.mockapi.io/backend/cars/carPark/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            carName.value = data.name;
            carPrice.value = data.price;
            carImage.value = data.image;
        })
        .catch((err) => {
            document.querySelector('.alert').textContent = `${err}`;
            showAlert();
        });
}

async function updateCar() {
    if (carName.value && carPrice.value && carImage.value && carPrice.value >= 1) {
        fetch(`https://632032139f82827dcf26f6c9.mockapi.io/backend/cars/carPark/${carId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'name': carName.value,
                'price': parseInt(carPrice.value),
                'image': carImage.value
            })
        })
            .then(res => {
                if (res.ok) {
                    carName.value = '';
                    carPrice.value = '';
                    carImage.value = '';
                    localStorage.removeItem('id');
                    window.location.href = 'index.html';
                } else {
                    showAlert();
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                showAlert();
            })
    }
}

getCar(carId);