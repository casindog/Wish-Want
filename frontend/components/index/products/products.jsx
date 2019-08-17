import React from 'react';
import Flyers from './Flyers';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {loading: true};
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    componentDidMount () {
        // scroll down on index page.
        window.addEventListener('mouseevent', function getMoreProducts (e) {
            products = products.concat(products.slice(20,40));
        })
    }

    splashOrIndex() {
        if (this.props.purpose === "splash-products") {
            this.id = "splash-products";
            // shouldn't allow hover magnify on splash background
            this.id2 = "splash-item-container"
        } else {
            this.id = "index-products";
            this.id2 = "index_item_container"
            // limit to show 20 first, then on scroll down detect, show another 20l
            // this.products = this.products.slice(0, 20);
        };

        let products = this.props.products.map(product => (
            <div className={this.id2}>
                <div className='index_item_img'>
                    <img src={product.photoUrls} />
                    <Flyers product={product} />
                </div>

                <div className='index_item_info'>
                    <div className='index-item-top'>{product.original_price}</div>
                    <div className='index-item-bottom'>{product.transactions}+ bought this</div>
                    {/* <div>{product.verified}</div>
                    <div>{product.fast_shipping}</div>
                    <div>{product.almost_gone}</div> */}
                </div>
            </div>
        ));

        // duplicate seed data 3 times
        for (let i = 0; i < 3; i++) {
            products = products.concat(products);
        };

        if (this.props.purpose === "splash-products") products = products.shuffle();
        return products
    }

    render() {
        if (this.props.products.length === 0) return null;

        let products = this.splashOrIndex();

        return (
            <div id={this.id}>
                {products}
            </div>
        )
    }
}

export default Products;


// kc: shuffle items on splash page
Array.prototype.shuffle = function () {
    var input = this;

    for (var i = input.length - 1; i >= 0; i--) {

        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}
