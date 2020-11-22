const cartBody = document.querySelector(".cart--body");
const cartTotal = document.querySelector(".cart--total");

const cartStorage = JSON.parse(localStorage.getItem("items"));
console.log(cartStorage);
const cart = [];
let total = 0;

if (cartStorage) {
  cartStorage.forEach((i) => {
    cart.push(i);

    cartBody.innerHTML += `
          <div class="body--item">
              <img src="${i.image}" alt="">
              <p class="ml-2">${i.product}</p>
              <p>${i.price}</p>
              <button class="button--delete text-red-600 text-2xl"><i class="fas fa-trash-alt"></i></button>
          </div>
      `;
    total = total + Number(i.price);
  });
}

cartTotal.innerHTML = `$${total}`;

const buttonDelete = document.querySelectorAll(".button--delete");
const cartItem = document.querySelectorAll(".body--item");

for (let i = 0; i < buttonDelete.length; i++) {
  buttonDelete[i].addEventListener("click", () => {
    cartItem[i].remove();
    cart.splice(i, 1);
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(cart));
  });
}

const buttonsCart = document.querySelectorAll(".cart--button");

buttonsCart.forEach((b) => {
  b.addEventListener("click", () => {
    localStorage.removeItem("items");

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successful process",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => location.reload(), 1000);
  });
});
