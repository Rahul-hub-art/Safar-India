function goCart(){
  window.location.href = "cart.html";
}

document.addEventListener("DOMContentLoaded", () => {

  // ================= LOGIN =================
  const loginBox = document.getElementById("loginBox");
  const loginBtn = document.querySelector(".login-btn");

  window.toggleLogin = function () {
    if (!loginBox) return;
    loginBox.style.display =
      loginBox.style.display === "block" ? "none" : "block";
  };

  document.addEventListener("click", (e) => {
    if (!loginBox || !loginBtn) return;

    if (!loginBox.contains(e.target) && !loginBtn.contains(e.target)) {
      loginBox.style.display = "none";
    }
  });

  window.login = () => alert("Login Successful");
  window.logout = () => alert("Logout Successful");


  // ================= HERO BACKGROUND =================
  const bgSlides = document.querySelectorAll(".hero-bg");
  let bgIndex = 0;

  if (bgSlides.length) {
    setInterval(() => {
      bgSlides[bgIndex].classList.remove("active");
      bgIndex = (bgIndex + 1) % bgSlides.length;
      bgSlides[bgIndex].classList.add("active");
    }, 4000);
  }


  // ================= IMAGE SLIDER =================
  const slides = document.querySelectorAll(".slide");
  let slideIndex = 0;

  if (slides.length) {
    setInterval(() => {
      slides[slideIndex].classList.remove("active");
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add("active");
    }, 3000);
  }


  // ================= OFFER SLIDER =================
  const offerSlides = document.querySelectorAll(".offer-slide");
  let currentSlide = 0;

  function showSlide(n){
    if (!offerSlides.length) return;

    offerSlides[currentSlide].classList.remove("active");
    currentSlide = (n + offerSlides.length) % offerSlides.length;
    offerSlides[currentSlide].classList.add("active");
  }

  if (offerSlides.length) {
    setInterval(() => showSlide(currentSlide + 1), 4000);
  }

  window.changeSlide = (n) => showSlide(currentSlide + n);


  window.addToCart = function (itemName) {
  // 1. Get the existing cart from Local Storage, or start an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // 2. Check if item already exists to increase quantity instead of duplicating
  let existingItem = cart.find(item => item.name === itemName);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    // Add new item with some default values (you can customize these later)
    cart.push({
      name: itemName,
      price: 5000, // Default price, you'll need to pass real prices dynamically later
      qty: 1,
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" // Default image
    });
  }

  // 3. Save back to Local Storage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(itemName + " added to cart 🛒");
};

  // ================= BOOKING =================
  window.bookNow = function () {
    const name = document.getElementById("name");
    const dest = document.getElementById("destination");
    const status = document.getElementById("bookingStatus");

    if (!name || !dest || !status) return;

    if (name.value && dest.value) {
      status.innerText = `Booking confirmed for ${name.value} to ${dest.value}`;
    } else {
      alert("Please fill all details");
    }
  };


  // ================= REVIEWS =================
  window.addReview = function () {
    const text = document.getElementById("reviewText");
    const rating = document.getElementById("rating");
    const reviews = document.getElementById("reviews");

    if (!text || !rating || !reviews || !text.value) return;

    const div = document.createElement("div");
    div.className = "review-card";
    div.innerHTML = `
      <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*10)}.jpg">
      <h4>User</h4>
      <p>⭐${rating.value}</p>
      <p>${text.value}</p>
    `;

    reviews.appendChild(div);
    text.value = "";
  };


  // ================= FILTER =================
  window.filterPackages = function (type) {
    const cards = document.querySelectorAll(".package-card");

    cards.forEach(card => {
      if (type === "all" || card.classList.contains(type)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };


  // ================= SCROLL ANIMATION (OPTIMIZED) =================
  const animatedItems = document.querySelectorAll(
    ".package-card, .activity-card, .feature, .featured-article, .small-article, .adventure-card"
  );

  animatedItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(50px)";
    item.style.transition = "0.6s";
  });

  window.addEventListener("scroll", () => {
    animatedItems.forEach(item => {
      const top = item.getBoundingClientRect().top;

      if (top < window.innerHeight - 50) {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }
    });
  });


  // ================= STATS COUNTER =================
  const counters = document.querySelectorAll(".counter");
  let started = false;

  window.addEventListener("scroll", () => {
    const section = document.querySelector(".stats-section");
    if (!section || started) return;

    const top = section.getBoundingClientRect().top;

    if (top < window.innerHeight) {
      counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;
        const increment = target / 100;

        function update() {
          count += increment;
          if (count < target) {
            counter.innerText = Math.floor(count);
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
          }
        }

        update();
      });

      started = true;
    }
  });

});


// ================= NEWSLETTER =================
function subscribe(){
  let email = document.getElementById("email");

  if(email && email.value){
    alert("Subscribed successfully!");
    email.value = "";
  } else {
    alert("Please enter email");
  }
}

// ================= SEARCH =================
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".activity-card-page");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();

    cards.forEach(card => {
      let text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
  });
}

// ================= FILTER =================
function filterActivities(type, btn){

  let cards = document.querySelectorAll(".activity-card-page");
  let buttons = document.querySelectorAll(".category-filter button");

  // Remove active class from all buttons
  buttons.forEach(b => b.classList.remove("active"));

  // Add active class to clicked button
  btn.classList.add("active");

  // Filter cards
  cards.forEach(card => {
    if(type === "all" || card.classList.contains(type)){
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// MODAL
function openBooking(name){
  document.getElementById("bookingModal").style.display = "flex";
  document.getElementById("activityName").innerText = name;
}

function closeModal(){
  document.getElementById("bookingModal").style.display = "none";
}

function confirmBooking(){
  alert("Booking Confirmed!");
  closeModal();
}

// PRICE TOGGLE
const toggle = document.getElementById("priceToggle");
const prices = document.querySelectorAll(".price");

if (toggle) {
toggle.addEventListener("change", ()=>{
  prices.forEach(price=>{
    let month = price.getAttribute("data-month");
    let year = price.getAttribute("data-year");

    price.innerText = toggle.checked ? "₹" + year : "₹" + month;
  });
});
}

// MODAL
function openPlan(name){
  document.getElementById("planModal").style.display = "flex";
  document.getElementById("planName").innerText = name;
}

function closePlan(){
  document.getElementById("planModal").style.display = "none";
}

function confirmPlan(){
  alert("Plan Selected Successfully!");
  closePlan();
}

// FILTER BLOG
function filterBlog(type){
  let blogs = document.querySelectorAll(".blog-card");

  blogs.forEach(blog => {
    if(type === "all"){
      blog.style.display = "flex";
    } else if(blog.classList.contains(type)){
      blog.style.display = "flex";
    } else {
      blog.style.display = "none";
    }
  });
}

// SEARCH BLOG
const searchBlog = document.getElementById("searchBlog");
if (searchBlog) {
  searchBlog.addEventListener("keyup", function(){

  blogs.forEach(blog => {
    let text = blog.innerText.toLowerCase();
    blog.style.display = text.includes(value) ? "flex" : "none";
  });
});
}

// ================= WISHLIST SYSTEM =================

// DEFAULT ITEMS (FIRST TIME ONLY)
const defaultWishlist = [
  {
    name: "Goa",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
    desc: "Beaches • Nightlife"
  },
  {
    name: "Manali",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    desc: "Snow • Mountains"
  },
  {
    name: "Jaipur",
    img: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    desc: "Heritage • Culture"
  },
  {
    name: "Kerala",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    desc: "Backwaters • Nature"
  },
  {
    name: "Ladakh",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    desc: "Adventure • Mountains"
  }
];

// GET DATA
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// FIRST TIME LOAD DEFAULT
if (wishlist.length === 0) {
  wishlist = defaultWishlist;
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// DISPLAY FUNCTION
function displayWishlist() {
  const container = document.getElementById("wishlistContainer");
  const empty = document.getElementById("emptyWishlist");

  if (!container) return;

  container.innerHTML = "";

  if (wishlist.length === 0) {
    empty.style.display = "block";
    return;
  } else {
    empty.style.display = "none";
  }

  wishlist.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "wishlist-card";

    div.innerHTML = `
      <img src="${item.img}">
      <div class="wishlist-info">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>

        <div class="wishlist-actions">
          <button class="remove-btn" onclick="removeWishlist(${index})">Remove</button>
          <button class="cart-btn" onclick="moveToCart(${index})">Add to Cart</button>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}

// REMOVE ITEM
function removeWishlist(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  displayWishlist();
}

// MOVE TO CART
function moveToCart(index) {
  alert(wishlist[index].name + " moved to cart 🛒");
  removeWishlist(index);
}

// ADD TO WISHLIST (IMPORTANT)
function addToWishlist(name, img, desc) {

  // CHECK DUPLICATE
  const exists = wishlist.some(item => item.name === name);
  if (exists) {
    alert("Already in wishlist ❤️");
    return;
  }

  wishlist.push({ name, img, desc });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  alert("Added to wishlist ❤️");

  // AUTO UPDATE IF ON PAGE
  displayWishlist();
}

// AUTO LOAD
document.addEventListener("DOMContentLoaded", displayWishlist);

window.addEventListener("storage", () => {
  wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  displayWishlist();
});

// COUNTER ANIMATION
const counters = document.querySelectorAll(".counter");

window.addEventListener("scroll", () => {

  counters.forEach(counter => {

    const top = counter.getBoundingClientRect().top;

    if(top < window.innerHeight){

      let target = +counter.getAttribute("data-target");
      let count = 0;

      let update = () => {
        count += target / 100;

        if(count < target){
          counter.innerText = Math.floor(count);
          setTimeout(update,20);
        } else {
          counter.innerText = target;
        }
      };

      update();
    }

  });

});

// SEND MESSAGE
function sendMessage(){
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  if(name && email && message){
    document.getElementById("formStatus").innerText =
      "Message sent successfully ✅";
  } else {
    alert("Please fill all fields");
  }
}

// FAQ TOGGLE
function toggleFAQ(el){
  let p = el.nextElementSibling;

  if(p.style.display === "block"){
    p.style.display = "none";
  } else {
    p.style.display = "block";
  }
}

// ================= CART SYSTEM =================

// 1. Fetch data from LocalStorage or use default sample data
let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    name: "Goa",
    price: 5000,
    qty: 1,
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2"
  },
  {
    name: "Manali",
    price: 7000,
    qty: 1,
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
  name: "Jaipur",
  price: 6000,
  qty: 1,
  img: "https://images.unsplash.com/photo-1477587458883-47145ed94245"
  },
  {
  name: "Kerala",
  price: 8000,
  qty: 1,
  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
}
  
];

// 2. Display the Cart Items
function displayCart() {
  let container = document.getElementById("cartItems");
  let empty = document.getElementById("emptyCart");

  if (!container) return; // Stop if not on the cart page

  container.innerHTML = "";

  // Check if cart is empty
  if (cart.length === 0) {
    empty.style.display = "block";
    updateTotal(); // Reset totals to 0
    return;
  } else {
    empty.style.display = "none";
  }

  // Generate HTML for each item
  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "cart-card";

    // Matches your CSS structure
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p class="price">₹${item.price.toLocaleString()}</p>
        <div class="qty">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
      <div class="remove" onclick="removeItem(${index})"><i class="fa fa-trash"></i> Remove</div>
    `;

    container.appendChild(div);
  });

  updateTotal();
}

// 3. Change Item Quantity
function changeQty(index, change) {
  cart[index].qty += change;

  // Prevent quantity from going below 1
  if (cart[index].qty <= 0) {
    cart[index].qty = 1; 
  }

  saveCart();
}

// 4. Remove Item from Cart
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

// 5. Save changes to LocalStorage and Re-render
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); 
}

// 6. Calculate Math (Subtotal, Tax, Total)
function updateTotal() {
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;
  });

  let tax = subtotal * 0.05; // 5% tax
  let total = subtotal + tax;

  // Update DOM elements
  document.getElementById("subtotal").innerText = subtotal.toLocaleString();
  document.getElementById("tax").innerText = Math.floor(tax).toLocaleString();
  document.getElementById("total").innerText = Math.floor(total).toLocaleString();
}

// 7. Apply Promo Code
function applyPromo() {
  let code = document.getElementById("promo").value;

  if (code === "SAFAR10") {
    alert("10% Discount Applied 🎉");
    // You could add logic here to actually reduce the totalValue
  } else {
    alert("Invalid Code");
  }
}

// 8. Checkout Action
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Proceeding to payment 💳");
  }
}

// 9. Initialize cart as soon as the HTML loads
document.addEventListener("DOMContentLoaded", displayCart);

// ================= PROFILE SAVE =================
function saveProfile(){
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;

  localStorage.setItem("user", JSON.stringify({name,email,phone}));

  alert("Profile Saved ✅");
}


// LOAD PROFILE
window.addEventListener("DOMContentLoaded", () => {
  let user = JSON.parse(localStorage.getItem("user"));

  if(user){
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
  }

  loadBookings();
  loadWishlistPreview();
});


// ================= BOOKINGS =================
function loadBookings(){
  let container = document.getElementById("bookingList");

  let bookings = [
    "Goa Trip - ₹5000",
    "Manali Adventure - ₹7000"
  ];

  bookings.forEach(item=>{
    let div = document.createElement("div");
    div.className = "booking-card";
    div.innerText = item;
    container.appendChild(div);
  });
}


// ================= WISHLIST PREVIEW =================
function loadWishlistPreview(){
  let container = document.getElementById("wishlistPreview");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  wishlist.slice(0,4).forEach(item=>{
    let div = document.createElement("div");
    div.className = "wishlist-card";
    div.innerHTML = `<h4>${item.name}</h4>`;
    container.appendChild(div);
  });
}


// ================= LOGOUT =================
function logout(){
  alert("Logged Out");
  window.location.href = "index.html";
}

let isLogin = true;

// TOGGLE LOGIN/SIGNUP
function toggleForm(){
  isLogin = !isLogin;

  document.getElementById("formTitle").innerText = isLogin ? "Login" : "Sign Up";
  document.getElementById("submitBtn").innerText = isLogin ? "Login" : "Register";

  document.getElementById("name").style.display = isLogin ? "none" : "block";

  document.getElementById("switchText").innerHTML =
    isLogin
      ? `Don't have an account? <span onclick="toggleForm()">Sign Up</span>`
      : `Already have an account? <span onclick="toggleForm()">Login</span>`;
}


// SHOW PASSWORD
function togglePassword(){
  let pass = document.getElementById("password");

  pass.type = pass.type === "password" ? "text" : "password";
}


// AUTH SYSTEM (LOCALSTORAGE)
const authForm = document.getElementById("authForm");
if (authForm) {
  authForm.addEventListener("submit", function(e){

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if(isLogin){

    if(user && user.email === email && user.password === password){
      alert("Login Successful ✅");
      window.location.href = "index.html";
    } else {
      alert("Invalid Email or Password ❌");
    }

  } else {

    localStorage.setItem("user", JSON.stringify({name,email,password}));
    alert("Account Created ✅");
    toggleForm();
  }
});
}