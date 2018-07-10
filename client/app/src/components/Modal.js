import React from 'react';
import UserComment from './UserComment';
import CommentForm from './CommentForm';



const Modal = (props) => {
    const commentList = props.comments.map((comment, i) => {
        if (comment.location_id === props.place.id) {
        return <UserComment
            key={comment.id}
            id={comment.id}
            title={comment.title}
            body={comment.body}
            postDate={comment.posted_at}
            delete={props.delete} />
        } else return null;
    });

    return (

            <div className='Modal'>
                <div className='OuterWrapper'>
                    <div className='InnerWrapper'>
                        <div className='Place'>
                            <small className='Close' onClick={() => props.toggle()}>Close</small>
                            <small onClick={() => props.delete(props.place.id, 'basic_information/')}
                            className='Delete'>Delete</small>
                            <h2>{props.place.name}</h2><small className='Distance'>{props.place.distance}</small>
                            <p className='P'>{props.place.address}</p>
                            <p className='P'>{props.place.description}</p>
                        </div>
                        <div className='InnerModal'>
                            {commentList}
                            <CommentForm
                                toggle={props.toggle}
                                currentLocation={props.place.id}
                                post={props.post} />
                        </div>
                    </div>
                </div>
            </div>

    );
}

export default Modal
