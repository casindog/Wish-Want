import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmitDemo = this.handleSubmitDemo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.swap = this.swap.bind(this);
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value })
        }
    }

    handleSubmitDemo(e) {
        e.preventDefault();

        // wait, i don't understand how this works. 
        this.props.login({email:'Demo@hotmail.com', password:'password'})
           .then(() => this.props.closeModal());

        // this.props.login(this.state);
 
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createNewUser(this.state)
            .then(() => this.props.closeModal());
    }

    renderErrors() {
        return(
            <ul>
                {this.props.errors.map((error,idx) => (
                    <li key={`error-${idx}`}>
                        {error}
                    </li>
                ))}
            </ul>
        )
    }

    swap() {
        this.props.openModal('login');
    }

    render () {
        return (
            <div className='modal'>
                <div className='modal-rotate-ad'>
                    <div className='modal-prices'>
                        <div className='modal-rotate-info-strike'>$176</div>
                        <div className='modal-rotate-info'>$14</div>
                        <div className='modal-chevron'></div>
                    </div>
                    <img className='modal-rotate-img' src='https://contestimg.wish.com/api/webimage/58a69b26082573593316c166-large.jpg?cache_buster=a9f4cc067e7f45608a805ab881630886' />
                </div>

                <div className='modal-login'>
                    <div className='modal-title'>
                        Sign up!
                    </div>
                    
                    <div className='modal-errors'>
                        {this.renderErrors()}
                    </div>
                
                    <form>
                        <div className='modal-form'>
                            <div className='modal-input-wrapper'>
                                <label className='modal-label'>Email</label>
                                <input className='modal-inputs' type="text" value={this.state.email} onChange={this.handleInput('email')} />
                            </div>

                            <div className='modal-input-wrapper'>
                                <label className='modal-label'>Password</label>
                                <input className='modal-inputs' type="password" value={this.state.password} onChange={this.handleInput('password')} />
                            </div>
                        </div>
                    </form>
                    
                    <div className='modal-buttons'>
                        <button className='modal-submit' onClick={this.handleSubmit}>Sign Up</button>
                        <button className='modal-submit' onClick={this.handleSubmitDemo}>Demo User</button>
                    </div>

                    <div className='modal-msg'>
                        <a href='#' onClick={this.swap}>Have an account? Log in!</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;