import React from 'react';

const DeleteModal = (props) => (
    <div className='Modal'>
            <div className='OuterWrapper'>
                <div className='InnerWrapper'>
                    <p className='Message'>Are you sure you want to delete?</p>
                    <p className='Yes' onClick={() => props.confirm()}>Yes</p>
                    <p className='No' onClick={() => props.decline()}>No</p>
                </div>
            </div>
        </div>
);

export default DeleteModal;
