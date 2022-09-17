let cars = [];// всьо шо на сервачку
let filterArr = [];// новий масив при фільтруванні

function toCreatePage() {
    window.location.href = 'creation.html';
}

function toEditPage(id) {
    localStorage.setItem('id', id);
    window.location.href = 'edition.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

function createCarElem(arr) {
    let index = 0;
    arr.forEach(element => {
        document.querySelector('.content').innerHTML += `
        <div class="item">
            <img src="${element.image}" alt="">
            <h2>${element.name}</h2>
            <p>${element.price}$</p>
            <div class="actions">  
                <button class="edit" onclick="toEditPage(${element.id})">Edit</button>
                <button class="delete" onclick="deleteCar(${element.id}, ${index++})">Delete</button>
            </div>
        </div>
        `;
    });
} 
// створює плитку яка витягує дані з сервачка
async function getCars() {
    fetch('https://632032139f82827dcf26f6c9.mockapi.io/backend/cars/carPark')
        .then(res => res.json())
        .then(data => {
            cars = data;
            document.querySelector('.content').replaceChildren();// ріплейс очишає плиточку на іннер html можна поміняти
            createCarElem(cars);
            getTotalPrice(cars);
        })
        .catch(err => console.log(err));
}

function searchCar() {
    document.querySelector('#name').checked = false;
    document.querySelector('#price').checked = false;
    let search = document.querySelector('#search').value;
    if (search) {
        let reg = new RegExp(`${search}`);
        filterArr = cars.filter(element => reg.test(element.name) === true);
        document.querySelector('.content').replaceChildren();
        createCarElem(filterArr);
        getTotalPrice(filterArr);
    } else {
        getCars();
    }
}

function sortNameAl(arr) {
    document.querySelector('#price').checked = false;
    arr.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
        } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
        } else {
            return 0;
        }
    });
    document.querySelector('.content').replaceChildren();
    createCarElem(arr);
}

function sortByName() {
    if (document.querySelector('#name').checked) {
        if (document.querySelector('#search').value) {
            sortNameAl(filterArr);
        } else {
            sortNameAl(cars);
        }
    } else if (!document.querySelector('#search').value) {
        document.querySelector('.content').replaceChildren();
        getCars();
    }
}

function sortPriceAl(arr) {
    document.querySelector('#name').checked = false;
    arr.sort((a, b) => {
        return a.price - b.price;
    });
    document.querySelector('.content').replaceChildren();
    createCarElem(arr);
}

function sortByPrice() {
    if (document.querySelector('#price').checked) {
        if (document.querySelector('#search').value) {
            sortPriceAl(filterArr);
        } else {
            sortPriceAl(cars);
        }
    } else if (!document.querySelector('#search').value) {
        document.querySelector('.content').replaceChildren();
        getCars();
    }
}

function getTotalPrice(arr) {
    let total = 0;
    console.log(arr);
    arr.forEach(element => {
        total += element.price;
    });
    document.querySelector('#totalPrice').textContent = `${total}$`;
}

async function deleteCar(id, index) {
    fetch(`https://632032139f82827dcf26f6c9.mockapi.io/backend/cars/carPark/${id}`,{
        method: 'DELETE'
    })  
    .then(res => {
        if(res.ok) {
            cars.splice(index, 1);
            document.querySelector('.content').replaceChildren();
            createCarElem(cars);
            getTotalPrice(cars);
        }
    }) 
} 

getCars();