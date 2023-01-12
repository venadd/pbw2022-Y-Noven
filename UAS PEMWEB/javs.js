//Chart 
var shoppingCart = (function () {
  cart = [];

  // variabel utama
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // simpan cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }



  // Public methods 

  var obj = {};

  // tambah ke cart
  obj.addItemToCart = function (name, price, count) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
  // hitung item
  obj.setCountForItem = function (name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // menghapus item
  obj.removeItemFromCart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  }

  // menghapus semua item
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // hapus cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  }

  // hitung cart
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }
  return obj;
})();


// tambah item
$('.add-to-cart').click(function (event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// hapus items
$('.clear-cart').click(function () {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  var input_ukuran;
 
  for(var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>Rp " + cartArray[i].price + "</td>"
      + "<td><select class=form-select' aria-label='Default select example'><option selected>Ukuran</option><option value='ukuran'>40</option><option value='ukuran'>41</option><option value='ukuran'>42</option><option value='ukuran'>43</option><option value='ukuran'>44</option></td>"
      + "<td>"
      + "<input type='number' style='width: 100px;' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<td>Rp " + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}


// menghitung input 
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();

// Whatsapp Checkout
$(document).on('click', '.send', function () {
  /* Inputan Formulir */
  var input_name = $("#name").val(),
    input_phone = $("#phone").val(),
    input_kodepos = $("#kodepos").val(),
    input_provinsi = $("#provinsi").val(),
    input_product = $("#product").val(),
    input_description = $("#description").val(),
    input_detail = $("#detail").val(),
    input_bayar = $("#bayar").val();
    
  /* Pengaturan Whatsapp */
  var walink = 'https://web.whatsapp.com/send',
    phone = '+6282135941959',
    text = 'MOHON SERTAKAN SCREENSHOOT KERANJANG BELANJA ANDA!!! (Pesanan Anda Akan Diproses Jika Mengirim ScreenShoot Keranjang Belanja',
    text_yes = 'Pesanan Anda berhasil terkirim.',
    text_no = 'Isilah formulir terlebih dahulu.';
  /* Smartphone Support */
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    var walink = 'whatsapp://send';
  }

  if (input_name != "" && input_phone != "" && input_product != "") {
    /* Whatsapp URL */
    var checkout_whatsapp = walink + '?phone=' + phone + '&text=' + text + '%0A%0A' +
      '*Nama* : ' + input_name + '%0A' +
      '*Nomor Kontak / Whatsapp* : ' + input_phone + '%0A' +
      '*Provinsi* : ' + input_provinsi + '%0A' +
      '*Kode Pos* : ' + input_kodepos + '%0A' +
      '*Alamat* : ' + input_description + '%0A' +
      '*Detail Alamat* : ' + input_detail + '%0A%0A' +
      
      '*Metode Pembayaran* :' + input_bayar + '%0A';
      

    /* Whatsapp Window Open */
    window.open(checkout_whatsapp, '_blank');
    document.getElementById("text-info").innerHTML = '<div class="alert alert-success">' + text_yes + '</div>';
  } else {
    document.getElementById("text-info").innerHTML = '<div class="alert alert-danger">' + text_no + '</div>';
  }
});

//bid menu
function myFunction() {
  var x = document.getElementById("myText");
  var defaultVal = x.defaultValue;
  var currentVal = x.value;
  
}

// carusel
const myCollapseEl = document.querySelector('#myCollapse')

myCollapseEl.addEventListener('shown.bs.collapse', event => {
  // Action to execute once the collapsible area is expanded
})
const myCarouselEl = document.querySelector('#myCarousel')
const carousel = bootstrap.Carousel.getInstance(myCarouselEl) // Retrieve a Carousel instance

myCarouselEl.addEventListener('slid.bs.carousel', event => {
  carousel.to('2') // Will slide to the slide 2 as soon as the transition to slide 1 is finished
})

carousel.to('1') 
carousel.to('2') 