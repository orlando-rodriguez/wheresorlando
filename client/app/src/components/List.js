import React from 'react';

const List = (props) => {
    const makeList = props.spots.map((place, i) => {
        return <li
                key={place.id}
                onClick={() => { props.recenterMap(i); props.toggleInfoWindow(i); }}
                className='ListItem' >
                    <p className='Name'>{place.name}</p>
                    <small className='Distance'>{place.distance}</small>
                    <p className='Address'>{place.address}</p>
                </li>
    });

    return (
        <div className='ListArea'>
            <ul>{makeList}</ul>
        </div>
    );
}

export default List;
