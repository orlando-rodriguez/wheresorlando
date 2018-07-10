import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';


class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            address: ''
        }
    }

    handleName = (event) => {
        this.setState({ name: event.target.value });
    }

    handleDescription = (event) => {
        this.setState({ description: event.target.value });
    }

    handleAddress = (event) => {
        this.setState({ address: event.target.value });
    }

    handleSubmit = (event) => {
        if (this.state.name === '' || this.state.description === ''
            || this.state.address === '') {
            alert('Please fill all fields.')
            return null;
        }
        event.preventDefault();
        let route = 'basic_information/';
        let data = {
            name: this.state.name,
            description: this.state.description,
            address: this.state.address
        }
        this.props.post(data, route, 'POST');
        this.setState({ name: '', description: '', address: '' });
        this.props.toggle();
    }

    render() {
        return (
            <StyleRoot>
                <div className='Modal'>
                    <div className='OuterWrapper'>
                        <div className='InnerWrapper'>
                            <small className='Close' onClick={() => this.props.toggle()}>Close</small>
                            <h3 className='Title'>Add a location</h3>
                            <p className='P'>Fill out the following form to add a new location. All fields are REQUIRED.</p>
                            <form onSubmit={this.handleSubmit} className='Form' >
                                <label className='Name'>
                                    Name:
                                    <input className='Input'
                                        type='text'
                                        onChange={this.handleName}
                                        value={this.state.name} />
                                </label>
                                <label className='Description'>
                                    Description:
                                    <textarea className='TextArea'
                                        onChange={this.handleDescription}
                                        value={this.state.description} >
                                    </textarea>
                                </label>
                                <label className='Address'>
                                    Address:
                                    <input className='AddressInput'
                                        type='text'
                                        onChange={this.handleAddress}
                                        value={this.state.address} />
                                </label>
                                <input className='Submit' type='submit' value='Submit' />
                            </form>
                        </div>
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

export default ModalForm;
