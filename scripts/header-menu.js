window.onload = function () {
    
    $("#pop-menu").click(function() {
        $(".menu-header").removeClass("d-none");
    });

    $("#exit").click(function() {
        $(".menu-header").addClass("d-none");
    });


    $(".switch-menu").click(function() {
        $(".switch-menu").removeClass("active");
        $(this).addClass("active");

        var item = $(".menu[menu="+$(this).attr('menu-parent') +"]");
        
        $(".menu").addClass("d-none");
        item.removeClass("d-none");

    })
    $('.owl-carousel').owlCarousel({
        items:1,
        lazyLoad:true,
        loop:true,
        margin:10
    });

    $(".item").click(function() {
        var item = $(".item-list[item-parent="+$(this).attr('item-data') +"]");

        if (item.hasClass("d-none")) {
            $(this).children("i").addClass("fa-rotate-180");
            item.removeClass("d-none");
        } else {
            $(this).children("i").removeClass("fa-rotate-180");
            item.addClass("d-none");
        }
    });


    $("body").on("click", ".black-circle", function() { 
        var allsize = document.getElementsByClassName("black-circle");
        for (var i = 0; i < allsize.length; i++) {
            if ($(this).parent().attr("id") == allsize[i].parentNode.id) {
                allsize[i].classList.remove("active-circle")
            }
        }
        $(this).addClass("active-circle");    
    }); 

    $("body").on("click", ".size-circle", function() {
        var allsize = document.getElementsByClassName("size-circle");
        for (var i = 0; i < allsize.length; i++) {
            if ($(this).parent().attr("id") == allsize[i].parentNode.id) {
                allsize[i].classList.remove("size-circle-active")
            }
        }
        $(this).addClass("size-circle-active"); 
    });

    $(".add-basket").click(function() {
        $(".basket-thing").addClass("d-none");
        $(".amount").removeClass("d-none");
    });

    $("body").on("click", ".control-add",function() {
        $("#"+$(this).attr("data")).text(parseInt($("#"+$(this).attr("data")).text()) + 1);
     });
     $("body").on("click", ".control-subtract", function() {
        if (parseInt($("#"+$(this).attr("data")).text()) > 0) {
            $("#"+$(this).attr("data")).text(parseInt($("#"+$(this).attr("data")).text()) - 1);
        }
     });

      
};

var currentindex = 1;
var cart = [
]

function insertCart() {
    var actualAmount = document.getElementById("main-amount").innerHTML;
    var activeCircles = document.getElementsByClassName("active-circle");
    var activeSizes = document.getElementsByClassName("size-circle-active");
    var actualColor = "";
    var actualSize = "";
    for (var i = 0; i < activeCircles.length; i++) {
        if (activeCircles[i].parentNode.id == "main-page") {
            if (activeCircles[i].children[0].style.backgroundColor == "black") {
                actualColor = "black";
            } else if (activeCircles[i].children[0].style.backgroundColor == "rgb(221, 133, 96)") {
                actualColor = "orange";
            } else {
                actualColor = "grey";
            }
        }
    }
    for (var i = 0; i < activeSizes.length; i++) {
        if (activeSizes[i].parentNode.id == "main-page") {
            actualSize = activeSizes[i].innerHTML.trim();
        }
    }

    cart.push({id: "item-"+currentindex, amount: actualAmount, size: actualSize, color: actualColor});
    console.log(cart);
    $(".basket-thing").removeClass("d-none");
    $(".amount").addClass("d-none");
    currentindex++;
}

function openCart() {
    clearItems();
    $(".page-1").addClass("d-none");
    $(".cart").removeClass("d-none");
    for (var i = 0; i < cart.length; i++) {
        additem(cart[i].amount, cart[i].size, cart[i].color, cart[i].id);
    }
}

function closeCart() {
    $(".page-1").removeClass("d-none");
    $(".cart").addClass("d-none");
}


function clearItems() {
    var parent = document.getElementById("addhere");
    parent.innerHTML = "";
}

function additem(amoun, size, color, who) {
    
    var parent = document.getElementById("addhere");

    var row1 = document.createElement("div");
    row1.className = "row pt-5";
    var col1 = document.createElement("div");
    col1.className = "col-4"
    var img = document.createElement("img");
    img.src = "assets/images/product.png"
    img.className = "img-fluid";

    col1.append(img);


    var col2 = document.createElement("div");
    col2.className = "col-7";
    var h6 = document.createElement("h6");
    h6.innerHTML = "MOHAN";
    var span1 = document.createElement("span");
    span1.className = "text-secondary d-block";
    span1.innerHTML = "Recycle boucle knit Cardigan Pink";

    var amount = document.createElement("div");
    amount.className = "amount";
    var amountflex = document.createElement("div");
    amountflex.className = "d-flex py-3 align-items-center"


    var circle1 = document.createElement("div");
    circle1.className = "circle control-subtract mr-3";
    circle1.style.color = "black";
    circle1.style.borderColor = "#888";
    circle1.innerHTML = "-";
    circle1.setAttribute("data", who)

    var circle2 = document.createElement("div");
    circle2.className = "circle control-add";
    circle2.style.color = "black";
    circle2.style.borderColor = "#888";
    circle2.innerHTML = "+";
    circle2.setAttribute("data", who)

    var amountnum = document.createElement("div");
    amountnum.id = who;
    amountnum.className = "mr-3";
    amountnum.innerHTML = amoun;
    
    amountflex.append(circle1, amountnum, circle2);
    amount.append(amountflex);

    var price = document.createElement("span");
    price.className = "orange d-block";
    price.innerHTML = "120$";

    col2.append(h6, span1, amount, price)


    var template = `
    <div class='row'>
        <div class='col-5 pr-5 align-items-center'>
            <div class='d-flex pt-2' id='`+who+`'>
                <span style='height: 0;' class='pr-2'>Color</span>
                <div class='black-circle mr-2'>
                    <div style='background-color: black;'></div>
                </div>
                <div class='black-circle mr-2'>
                    <div style='background-color: #DD8560;'></div>
                </div>
                <div class='black-circle mr-2'>
                    <div style='background-color: grey;'></div>
                </div>
            </div>
        </div>
        <div class='col-5 pl-3 m-0 p-0 '>
            <div class='d-flex ' style='align-items: start;' id='`+who+`'>
                <span style='height: 0; ' class='pr-2 pt-1'>Size</span>
                <div class='size-circle mr-2'>
                    S
                </div>
                <div class='size-circle mr-2'>
                    M
                </div>
                <div class='size-circle mr-2'>
                    L
                </div>
            </div>
        </div>
    </div>

`
    var col12 = document.createElement("div");
    col12.className = "col-12";
    col12.innerHTML = template;    

    
    row1.append(col1);
    row1.append(col2);
    row1.append(col12);
    parent.append(row1);


    var allcircles = document.getElementsByClassName("black-circle");
    var c = []
    for (var i = 0; i < allcircles.length; i++) {
        if (allcircles[i].parentNode.id.trim() == who.trim()) {
            c.push(allcircles[i]);
        }
    }

    if (color == "black") {
        c[0].classList.add("active-circle");
    } else if (color == "orange") {
        c[1].classList.add("active-circle");
    } else if (color == "grey") {
        c[2].classList.add("active-circle");
    }

    var allcircles2 = document.getElementsByClassName("size-circle");
    var c2 = []
    for (var i = 0; i < allcircles2.length; i++) {
        if (allcircles2[i].parentNode.id.trim() == who.trim()) {
            c2.push(allcircles2[i]);
        }
    }

    if (size == "S") {
        c2[0].classList.add("size-circle-active");
    } else if (size == "M") {
        c2[1].classList.add("size-circle-active");
    } else if (size == "L") {
        c2[2].classList.add("size-circle-active");
    }


}