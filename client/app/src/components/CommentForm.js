import React, { Component } from 'react';


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
        }
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    };

    handleBodyChange = (event) => {
        this.setState({
          body: event.target.value
        });
    };

    handleSubmit = (event) => {
        if (this.state.title === '' || this.state.body === '') {
            alert('All fields REQUIRED to post a comment.')
            return null;
        }
        event.preventDefault();
        let route = 'comments/';
        let data = {
            title: this.state.title,
            body: this.state.body,
            location_id: this.props.currentLocation
        }
        this.props.post(data, route, 'POST');
        this.setState({ title: '', body: '' });
        this.props.toggle();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='Form'>
            <small>Leave a comment:</small>

                <label>Title:</label>
                    <input className='Input'
                        type='text'
                        name='title'
                        onChange={this.handleTitleChange}
                        value={this.state.title} />
                      <label>Comment:</label>

                    <textarea className='Input'
                        name='body'
                        onChange={this.handleBodyChange}
                        value={this.state.body} >
                    </textarea>
                <input type='submit' value='Submit' className='Submit' />
            </form>
        );
    }

}

export default CommentForm;
