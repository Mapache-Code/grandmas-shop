const button = document.querySelectorAll(".button");
const searcher = document.querySelector(".searcher");

const item = document.querySelectorAll(".product");
const image = document.querySelectorAll(".product--image");
const addProduct = document.querySelectorAll(".button--add");

const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal--close");
const modalImage = document.querySelector(".modal--image");

const cart = [];
const cartStorage = JSON.parse(localStorage.getItem("items"));

const cartTotal = document.querySelector(".home--cart");
let total = 0;

function getWidth() {
  if (window.innerWidth <= 800) {
    const desktops = document.querySelectorAll(".desktop");
    desktops.forEach((desktop) => {
      desktop.style.display = "none";
    });

    const mobiles = document.querySelectorAll(".mobile");
    mobiles.forEach((mobile) => {
      mobile.style.display = "initial";
    });
  } else {
    const mobiles = document.querySelectorAll(".mobile");
    mobiles.forEach((mobile) => {
      mobile.style.display = "none";
    });

    const desktops = document.querySelectorAll(".desktop");
    desktops.forEach((desktop) => {
      desktop.style.display = "initial";
    });
  }
}

function Item(image, product, price) {
  this.image = image;
  this.product = product;
  this.price = price;
}

button.forEach((b) => {
  b.addEventListener("click", () => {
    item.forEach((i) => {
      if (b.dataset.product === "all") {
        i.removeAttribute("hidden");
      } else {
        if (i.dataset.product === b.dataset.product) {
          if (i.getAttribute("hidden") === "true") {
            i.removeAttribute("hidden");
          }
        } else {
          i.setAttribute("hidden", true);
        }
      }
    });
  });
});

searcher.addEventListener("keyup", () => {
  const result = searcher.value.toLowerCase();
  item.forEach((i) => {
    const itemValue = i.children[1].children[0].innerHTML.toLowerCase();
    if (itemValue.indexOf(result) !== -1) {
      if (i.getAttribute("hidden") === "true") {
        i.removeAttribute("hidden");
      }
    } else {
      i.setAttribute("hidden", true);
    }
  });
});

image.forEach((i) => {
  i.addEventListener("click", () => {
    modal.classList.remove("modal__none");
    modalImage.setAttribute("src", i.getAttribute("src"));
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.add("modal__none");
});

if (cartStorage) {
  cartStorage.forEach((i) => {
    total = total + Number(i.price);
    cart.push(i);
  });
}

for (let i = 0; i < addProduct.length; i++) {
  addProduct[i].addEventListener("click", () => {
    const image = addProduct[
      i
    ].parentNode.parentNode.children[0].children[1].getAttribute("src");
    const product =
      addProduct[i].parentNode.parentNode.children[1].children[0].children[0]
        .innerHTML;
    const price =
      addProduct[i].parentNode.parentNode.children[1].children[0].children[1]
        .children[0].innerHTML;

    cart.push(new Item(image, product, price));
    localStorage.setItem("items", JSON.stringify(cart));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your product has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      location.reload();
      location.replace("index.html#home");
    }, 1000);
  });
}

if (cartStorage === null) {
  cartTotal.innerHTML = `0 Items - $0`;
} else {
  cartTotal.innerHTML = `${cartStorage.length} Items - $${total}`;
}

getWidth();
