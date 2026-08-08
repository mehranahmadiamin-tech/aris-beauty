مهران:
document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       PRODUCT DATABASE
    ===================================== */

    const products = {

        lipstick: {
            name: "رژ لب مات آریس",
            category: "آرایش لب",
            price: 499000,
            icon: "💄",
            description:
                "رژ لب مات آریس با بافتی نرم و سبک، ماندگاری بالا و جلوه‌ای زیبا."
        },

        cream: {
            name: "کرم مرطوب‌کننده",
            category: "مراقبت پوست",
            price: 699000,
            icon: "🧴",
            description:
                "کرم مرطوب‌کننده آریس با فرمولی سبک برای نرمی و لطافت پوست."
        },

        perfume: {
            name: "عطر آریس لاکچری",
            category: "عطر و ادکلن",
            price: 1299000,
            icon: "🌸",
            description:
                "عطر آریس لاکچری با رایحه‌ای خاص و ماندگار."
        },

        powder: {
            name: "پنکیک آریس",
            category: "آرایش صورت",
            price: 599000,
            icon: "✨",
            description:
                "پنکیک آریس با پوشش طبیعی و یکدست برای آرایش روزانه."
        }

    };


    /* =====================================
       CART
    ===================================== */

    let cart =
        JSON.parse(
            localStorage.getItem("arisCart")
        ) || [];


    function saveCart() {

        localStorage.setItem(
            "arisCart",
            JSON.stringify(cart)
        );

    }


    function formatPrice(price) {

        return new Intl.NumberFormat("fa-IR")
            .format(price) + " تومان";

    }


    /* =====================================
       CART COUNT
    ===================================== */

    function updateCartCount() {

        const counters =
            document.querySelectorAll(".cart-count");


        let total = 0;


        cart.forEach(function (item) {

            total += Number(item.quantity) || 0;

        });


        counters.forEach(function (counter) {

            counter.textContent = total;

        });

    }


    updateCartCount();


    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".nav");


    if (menuToggle && nav) {

        menuToggle.addEventListener(
            "click",
            function () {

                nav.classList.toggle("open");

            }
        );

    }


    /* =====================================
       SEARCH BOX
    ===================================== */

    const searchToggle =
        document.querySelector(".search-toggle");

    const searchBox =
        document.getElementById("searchBox");


    if (searchToggle && searchBox) {

        searchToggle.addEventListener(
            "click",
            function () {

                searchBox.classList.toggle("show");

            }
        );

    }


    const globalSearch =
        document.getElementById("globalSearch");


    if (globalSearch) {

        globalSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    const query =
                        globalSearch.value.trim();


                    if (query) {

                        window.location.href =
                            "shop.html?search=" +
                            encodeURIComponent(query);

                    }

                }

            }
        );

    }


    /* =====================================
       SHOP SEARCH
    ===================================== */

    const productSearch =
        document.getElementById(
            "productSearch"
        );


    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );


    const productCards =
        document.querySelectorAll(
            ".product-card"
        );

function filterProducts() {

        if (!productSearch) {
            return;
        }


        const search =
            productSearch.value
                .trim()
                .toLowerCase();


        const active =
            document.querySelector(
                ".filter-btn.active"
            );


        const category =
            active
                ? active.dataset.category
                : "همه";


        productCards.forEach(
            function (card) {

                const name =
                    card.querySelector("h3")
                        .textContent
                        .toLowerCase();


                const cardCategory =
                    card.querySelector(
                        ".product-category"
                    ).textContent.trim();


                const searchMatch =
                    name.includes(search);


                const categoryMatch =
                    category === "همه" ||
                    cardCategory === category;


                card.style.display =
                    searchMatch &&
                    categoryMatch
                        ? ""
                        : "none";

            }
        );

    }


    if (productSearch) {

        productSearch.addEventListener(
            "input",
            filterProducts
        );


        const params =
            new URLSearchParams(
                window.location.search
            );


        const searchParam =
            params.get("search");


        if (searchParam) {

            productSearch.value =
                searchParam;

            filterProducts();

        }

    }


    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    filterProducts();

                }
            );

        }
    );


    /* =====================================
       CATEGORY FROM URL
    ===================================== */

    if (productSearch) {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const categoryParam =
            params.get("category");


        if (categoryParam) {

            filterButtons.forEach(
                function (button) {

                    if (
                        button.dataset.category ===
                        categoryParam
                    ) {

                        filterButtons.forEach(
                            function (btn) {

                                btn.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );

                    }

                }
            );


            filterProducts();

        }

    }


    /* =====================================
       PRODUCT PAGE
    ===================================== */

    const detailName =
        document.getElementById(
            "detailName"
        );


    if (detailName) {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const id =
            params.get("product");


        const product =
            products[id];


        if (product) {

            const category =
                document.getElementById(
                    "detailCategory"
                );


            const price =
                document.getElementById(
                    "detailPrice"
                );

const description =
                document.getElementById(
                    "detailDescription"
                );


            const image =
                document.getElementById(
                    "detailImage"
                );


            detailName.textContent =
                product.name;


            category.textContent =
                product.category;


            price.textContent =
                formatPrice(product.price);


            description.textContent =
                product.description;


            if (image) {

                image.textContent =
                    product.icon;

            }


            document.title =
                product.name +
                " | Aris Beauty";


            setupProductQuantity(id);

        }

    }


    /* =====================================
       PRODUCT QUANTITY
    ===================================== */

    function setupProductQuantity(productId) {

        const increase =
            document.getElementById(
                "increase"
            );


        const decrease =
            document.getElementById(
                "decrease"
            );


        const quantityElement =
            document.getElementById(
                "quantity"
            );


        const addButton =
            document.getElementById(
                "addToCart"
            );


        let quantity = 1;


        if (
            increase &&
            decrease &&
            quantityElement
        ) {

            increase.addEventListener(
                "click",
                function () {

                    quantity++;

                    quantityElement.textContent =
                        quantity;

                }
            );


            decrease.addEventListener(
                "click",
                function () {

                    if (quantity > 1) {

                        quantity--;

                        quantityElement.textContent =
                            quantity;

                    }

                }
            );

        }


        if (addButton) {

            addButton.addEventListener(
                "click",
                function () {

                    const existing =
                        cart.find(
                            function (item) {

                                return item.id ===
                                    productId;

                            }
                        );


                    if (existing) {

                        existing.quantity +=
                            quantity;

                    } else {

                        cart.push({

                            id: productId,

                            quantity: quantity

                        });

                    }


                    saveCart();

                    updateCartCount();


                    showMessage(
                        "محصول به سبد خرید اضافه شد 🛒"
                    );

                }
            );

        }

    }


    /* =====================================
       CART PAGE
    ===================================== */

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    function renderCart() {

        if (!cartItems) {
            return;
        }


        cartItems.innerHTML = "";


        if (cart.length === 0) {

            cartItems.innerHTML = 

                <div class="empty-cart">

                    <div class="empty-cart-icon">
                        🛒
                    </div>

                    <h2>
                        سبد خرید خالی است
                    </h2>

                    <p>
                        هنوز محصولی انتخاب نکرده‌ای.
                    </p>

                    <a
                        href="shop.html"
                        class="continue-shopping">

                        مشاهده محصولات

                    </a>

                </div>

            ;


            updateCartSummary(0);

return;

        }


        let subtotal = 0;


        cart.forEach(
            function (item) {

                const product =
                    products[item.id];


                if (!product) {
                    return;
                }


                const itemTotal =
                    product.price *
                    item.quantity;


                subtotal += itemTotal;


                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "cart-item";


                element.innerHTML = 

                    <div class="cart-item-image">

                        ${product.icon}

                    </div>


                    <div class="cart-item-info">

                        <span>
                            ${product.category}
                        </span>

                        <h3>
                            ${product.name}
                        </h3>

                        <strong>
                            ${formatPrice(product.price)}
                        </strong>

                    </div>


                    <div class="cart-item-quantity">

                        <button
                            type="button"
                            class="cart-minus"
                            data-id="${item.id}">

                            −

                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            class="cart-plus"
                            data-id="${item.id}">

                            +

                        </button>

                    </div>


                    <div class="cart-item-total">

                        ${formatPrice(itemTotal)}

                    </div>


                    <button
                        type="button"
                        class="cart-remove"
                        data-id="${item.id}">

                        حذف

                    </button>

                ;


                cartItems.appendChild(
                    element
                );

            }
        );


        updateCartSummary(subtotal);


        setupCartButtons();

    }


    function updateCartSummary(subtotal) {

        const subtotalElement =
            document.getElementById(
                "cartSubtotal"
            );


        const shippingElement =
            document.getElementById(
                "shipping"
            );


        const totalElement =
            document.getElementById(
                "cartTotal"
            );


        if (!subtotalElement) {
            return;
        }


        const shipping =
            subtotal === 0
                ? 0
                : subtotal >= 1000000
                    ? 0
                    : 50000;


        let total =
            subtotal + shipping;


        const discount =
            Number(
                localStorage.getItem(
                    "arisDiscount"
                )
            ) || 0;


        total =
            Math.max(
                0,
                total - discount
            );


        subtotalElement.textContent =
            formatPrice(subtotal);


        shippingElement.textContent =
            shipping === 0
                ? "رایگان"
                : formatPrice(shipping);


        totalElement.textContent =
            formatPrice(total);

    }


    function setupCartButtons() {

        document
            .querySelectorAll(".cart-plus")
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const id =
                                button.dataset.id;

const item =
                                cart.find(
                                    function (item) {

                                        return item.id === id;

                                    }
                                );


                            if (item) {

                                item.quantity++;

                                saveCart();

                                updateCartCount();

                                renderCart();

                            }

                        }
                    );

                }
            );


        document
            .querySelectorAll(".cart-minus")
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const id =
                                button.dataset.id;


                            const item =
                                cart.find(
                                    function (item) {

                                        return item.id === id;

                                    }
                                );


                            if (!item) {
                                return;
                            }


                            if (item.quantity > 1) {

                                item.quantity--;

                            } else {

                                cart =
                                    cart.filter(
                                        function (item) {

                                            return item.id !== id;

                                        }
                                    );

                            }


                            saveCart();

                            updateCartCount();

                            renderCart();

                        }
                    );

                }
            );


        document
            .querySelectorAll(".cart-remove")
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const id =
                                button.dataset.id;


                            cart =
                                cart.filter(
                                    function (item) {

                                        return item.id !== id;

                                    }
                                );


                            saveCart();

                            updateCartCount();

                            renderCart();

                        }
                    );

                }
            );

    }


    renderCart();


    /* =====================================
       COUPON
    ===================================== */

    const couponButton =
        document.getElementById(
            "couponButton"
        );


    if (couponButton) {

        couponButton.addEventListener(
            "click",
            function () {

                const input =
                    document.getElementById(
                        "couponInput"
                    );


                const message =
                    document.getElementById(
                        "couponMessage"
                    );


                const code =
                    input.value
                        .trim()
                        .toUpperCase();


                if (code === "ARIS10") {

                    localStorage.setItem(
                        "arisDiscount",
                        100000
                    );


                    
