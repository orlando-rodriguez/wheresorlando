import React from 'react';
import Map from './Map';
import List from './List';
import './Project.css';
import ReactLoading from 'react-loading';

const Main = (props) => {
    return (
        <main>
            <Map
                showMap={props.showMap}
                toggleMap={props.toggleMap}
                infoWindows={props.infoWindows}
                location={props.location}
                spots={props.spots}
                mapFocus={props.mapFocus}
                toggleModal={props.toggleModal}
                toggleInfoWindow={props.toggleInfoWindow} />
            { props.loading && <ReactLoading
                type='bars'
                height={200}
                width={200}
                color='#162521'
            className='Loading' /> }
            <List
                toggleInfoWindow={props.toggleInfoWindow}
                recenterMap={props.recenterMap}
                spots={props.spots}
                toggleForm={props.toggleForm} />
        </main>
    );
}

export default Main;
