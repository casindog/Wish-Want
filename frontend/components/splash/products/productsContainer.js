import { connect } from 'react-redux';
// import { requestProducts } from '../../../actions/products_action';
import Products from './products';

const msp = state => {
    return {
        products: Object.values(state.entities.products)
    }
}

const mdp = dispatch => ({
    // requestProducts: () => dispatch(requestProducts())
})

export default connect(msp, mdp)(Products);