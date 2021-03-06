import React from 'react';
import ProfileModal from './profileModal/profileModal';

class NavBar extends React.Component {
    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {search: ""};
    }
    
    componentDidMount() {
        let data = { cart: {
            user_id: this.props.session.id
        }}
        this.props.getCart(data);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.requestProducts(
            { search : {
                tag: this.state.search
            }
        }).then(() => {
            this.props.changeFilterView({ view: this.state.search, loading: false})
        })
    }

    handleInput(e) {
        this.setState({ search: e.target.value });
    }

    render () {

        return(
            <div id="fixed-nav">
                <ul className="Navbar">
                    <div className='Nav-Left'>
                        <div className='Nav-Left-items'>
                            Want
                        </div>
                    </div>

                    <div className='Nav-Right'>
                        <div className='Nav-Right-items'>
                            <form className='Nav-Search-Input' onSubmit={this.handleSubmit}>
                                <img className="img-icon" src="./search.png" alt=""/>
                                <input style={{width: "200px"}} value={this.state.search} onChange={this.handleInput} >

                                </input>

                                <button type="submit" className='Nav-Search'>Search</button>
                            </form>
                        </div>

                        {this.props.session.id === null ? (
                            <div>
                            </div>
                        ) : (
                            <div className='Nav-Right'>
                                <div className='Nav-portrait' onClick={() => this.props.openModal('profile')}>
                                    <ProfileModal/>
                                    <img className='Nav-portrait-img' src="https://contestimg.wish.com/api/image/fetch?profile_image_name=NTYwNWMxYmEyMWE4NjMxNzk0ZTk1NDUy_1398450030237.jpg&w=50&h=50" alt=""/>
                                    <div>    
                                        {this.props.email}
                                    </div>
                                </div>

                                <div className='Nav-Right-items'>
                                    <img className="img-icon" src="./shoppingcart.png" alt=""/>
                                </div>

                                {/* <div className='Nav-Right-items'>
                                    <a href="#">WishList</a>
                                </div> */}
                            </div>
                        )}

                        {this.props.session.id === null ? (
                            <div className='Nav-Right'>
                                <div className='Nav-Right-items'>
                                    <button onClick={() => this.props.openModal('signup')}>Sign up with Email</button>
                                </div>

                                <div className='Nav-Right-items'>
                                    <button onClick={() => this.props.openModal('login')}>Login</button>
                                </div>
                            </div>
                        ) : (
                            <div className='Nav-Right-items'>

                            </div>
                        )}

                    </div>
                </ul>
            </div>
        )
    }
}

export default NavBar;