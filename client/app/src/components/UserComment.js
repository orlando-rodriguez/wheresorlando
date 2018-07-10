import React from 'react';


const UserComment = (props) => (
    <div className='UserComment'>
        <small onClick={() => props.delete(props.id, 'comments/')}
        className='Delete'>Remove</small>
        <h3>{props.title}</h3>
        <small className='Small'>{props.postDate}</small>
        <p className='Small'>{props.body}</p>
    </div>
);

export default UserComment;
