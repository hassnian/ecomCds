const cds = [{
        'name': 'cd1',
        'artist': 'Juan Magan',
        'desc': 'loremloremlorem',
        'url': 'http://images.coveralia.com/audio/s/Secreto_El_Famoso_Biberon-No_Me_Importa_Que_Hablen_(CD_Single)-Frontal.jpg',
        'price': 35,
    },

    {
        'name': 'Prometo',
        'artist': 'Pablo Alboran',
        'desc': 'Prometo es el nombre del cuarto álbum de estudio del cantautor español Pablo Alborán, lanzado el 17 de noviembre de 2017. Los primeros dos sencillos, ambos fueron publicados el 8 de septiembre de 2017.',
        'url': 'https://los40es00.epimg.net/los40/imagenes/2017/11/28/album/1511885438_220718_1512040981_album_normal.jpg',
        'price': 23,


    },
    {
        'name': 'JoyTime',
        'artist': 'Marshmellow',
        'desc': 'Joytime is the debut studio album by electronic producer and DJ Marshmello, which was self-released through his label, Joytime Collective on January 8, 2016.[1][2] When it was released it landed on iTunes top electronic albums on the first day.',
        'url': 'http://www.tricksware.com/wp-content/uploads/2017/04/Marshmello-2015-Joytime.png',
        'price': 34,


    },
    {
        'name': 'cd4',
        'artist': '????',
        'desc': 'loremloremlorem',
        'url': 'https://www.billboard.com/files/styles/review_main_image/public/media/fx_4Walls_Album_410.png',
        'price': 34,


    },

    {
        'name': 'cd5',
        'artist': 'David Guetta',
        'desc': 'loremloremlorem',
        'url': 'http://4.bp.blogspot.com/-Y8S0e7ftHHk/UWHzAekSeZI/AAAAAAAAAG8/ijsg3O4Bf20/s1600/david+guetta+album.jpg',
        'price': 34,


    },
    {
        'name': 'cd6',
        'artist': 'Rihanna',
        'desc': 'loremloremlorem',
        'url': 'https://cdn-images-1.medium.com/max/800/1*xQh9uJbFZ71gx0bZaSnMHQ.png',
        'price': 34,


    },
    {
        'name': 'cd7',
        'artist': 'Charlie Puth',
        'desc': 'loremloremlorem',
        'url': 'https://i.pinimg.com/736x/1c/d8/c8/1cd8c8ac27416e2db168d7be2f24a8eb--pop-music-album-covers-music-albums.jpg',
        'price': 34,


    }


]


//cd click
const cd = document.querySelector('.cd');
//modal global
const modal = document.querySelector('.modal-g');
//close button
const modalX = document.querySelector('.modal-x');



//change background
document.addEventListener("mouseover",(e)=>{
    if(e.target.classList.contains('cd-text')){
           const fondo=document.querySelector('.fondo');
           fondo.style.backgroundImage=e.target.parentElement.style.backgroundImage;

        
    }
})




document.addEventListener('click', (e) => {
    // console.log(e.target);

    UI.showModal(e);
    // UI.showCartBar(e);
    UI.closeModal(e);
    UI.updateCart(e);
    Store.removeCdBar(e);
    Store.addToCart(e);

    //add btn !!
});

class Store {


    static addToCart(e) {



        if (e.target.classList.contains('modal-btn')) {
            if (window.localStorage.getItem('cart') == null) {

                window.localStorage.setItem('cart', '1');

                const name = e.target.parentElement.children[2].firstChild.nodeValue;
                const arr = [];
                cds.forEach((e, index) => {
                    if (e.name == name) {

                        let currentCd = cds[index];

                        arr.push(currentCd);
                        window.localStorage.setItem('cartArr', JSON.stringify(arr));
                    }
                })

                UI.updateCart();

            } else {

                const name = e.target.parentElement.children[2].firstChild.nodeValue;
                cds.forEach((e, index) => {
                    if (e.name == name) {

                        let currentCd = cds[index];
                        const cartArr = JSON.parse(window.localStorage.getItem('cartArr'));
                        cartArr.push(currentCd);

                        window.localStorage.setItem('cartArr', JSON.stringify(cartArr));

                    }
                })
                //TODO
                //instate of ++ and -- its possible using the array's length of the
                //localstorage  to prevent problem
                let cart = window.localStorage.getItem('cart');
                cart++;
                window.localStorage.setItem('cart', cart);


                UI.updateCart();

            }

            // console.log();

            e.target.parentElement.parentElement.remove();


        }
        
        
    }

   
    static removeFromCart(){
        let cart = window.localStorage.getItem('cart');
        cart--;
        window.localStorage.setItem('cart', cart);
    }
       
    
    static removeCdBar(e){
        if(e.target.classList.contains('cart-bar-remove')){
            const cdName=e.target.parentElement.children[1].firstChild.nodeValue;
            const locStorCdArr=JSON.parse(window.localStorage.getItem('cartArr'));
            locStorCdArr.forEach((e,index)=>{
                if(cdName==e.name){
                    locStorCdArr.splice(index,1);
                    window.localStorage.setItem('cartArr',JSON.stringify(locStorCdArr));
                }
            })
            
                
            Store.removeFromCart()
            e.target.parentElement.remove()
            UI.updateCart();
                }
    //UI.load
    }

}



class UI {

    static showCartBar(e) {
        
            const body = document.querySelector('.cd-list');
            const div = document.createElement('div');
            div.classList.add('cart-bar-g');


            div.innerHTML = ` <div class="cart-bar-c">
            <span class="modal-x">X</span>
            <h1>Your cart</h1>
            <div class="cart-bar-body">
            </div>  <p class="font-weight-bold cart-bar-subtotal">Subtotal<span class="cart-bar-subtotal-price">300$</span></p>
            <a href="#" class="btn btn-danger btn-lg  cart-bar-btn">Checkout</a>`
            ;
            body.appendChild(div);
            UI.loadCartBarItems();




        

    }

    static loadCartBarItems(){

        const cartArr = JSON.parse(window.localStorage.getItem('cartArr'));
        const cartbody = document.querySelector('.cart-bar-body');
     
        if(cartArr==null||cartArr.length==0){
            const div = document.createElement('div');
            div.classList.add('cart-bar-empty');
            div.innerHTML=` <h2>The cart is empty!</h2>`;
            cartbody.appendChild(div);
        }
        else{
            
            cartArr.forEach((e, index) => {
                const div = document.createElement('div');
                div.classList.add('cart-bar-item');
                div.innerHTML = `<img src="${e.url}" alt="" class="cart-bar-img">
                <h2 class="cart-bar-title">${e.name}</h2>
                <span class="cart-bar-artist"> by ${e.artist}</span>
                <span class="cart-bar-price">${e.price}$</span>
                <a href="#" class="cart-bar-remove btn btn-outline-danger btn-sm">Remove</a></div> </div>`
                cartbody.appendChild(div);
    
            })

        }
    }
    static updateCart() {


        

        const carritoNumb = document.querySelector('.carrito-numb');
        const carritoNumbLocal = window.localStorage.getItem('cart');

        if (carritoNumbLocal == null ||carritoNumbLocal == "0" ) {
            carritoNumb.innerHTML = "Empty cart";
        }
        if (carritoNumbLocal > 0) {
            carritoNumb.innerHTML = carritoNumbLocal;
        }
    }


    static createModal(e) {


        const body = document.querySelector('.cd-list');
    
        //TODO 
        //with index of foratch loop instate of this 
        // url without url('')
        const url = e.target.parentElement.style.backgroundImage.slice(5, e.target.parentElement.style.backgroundImage.length - 2);

        

        cds.forEach((e) => {
            if (e.url == url) {
                // console.log("sup");
                console.log(`${e.name} by ${e.artist}`);
                const div = document.createElement('div');
                div.classList.add('modal-g');


                div.innerHTML = `<div class="modal-c">
                <span class="modal-x">X</span>
                <img src="${e.url}" alt="" class="modal-i">
                <h2 class="modal-t">${e.name}</h2>
                <h3 class="">by ${e.artist}</h3>
                <p class="modal-d">${e.desc}</p>
                <span>Price:${e.price}</span>
                <a href="#" class="btn btn-outline-primary modal-btn">Add to cart</a>
            </div>`;
                body.appendChild(div);


            }
        })

    }

    static showModal(e) {

        if (e.target.parentElement.parentElement.classList.contains('cd')) {
            UI.createModal(e);


            //TODO
            //problem using displat block and none
            // modal.style.display = "block";
        }


    }
    static closeModal(e) {

        if (e.target.classList.contains('modal-x')) {
            e.target.parentElement.parentElement.remove();

        }



    }

    static loadCds(cds) {

        cds.forEach((cd) => {
            const tbody = document.querySelector('.cd-list');

           


            const div = document.createElement('div');
            div.classList.add('cd');
            div.classList.add('mr-2');
            div.classList.add('mb-2');

            div.innerHTML = `
            <div style='background-image:url("${cd.url}")' class='caratula-img'>
            <span class="cd-text">MORE INFO</span></div>`;
            tbody.appendChild(div);

        });

    }
}



