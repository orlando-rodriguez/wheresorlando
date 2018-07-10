import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import Modal from './components/Modal'
import ModalForm from './components/ModalForm'
import DeleteModal from './components/DeleteModal'

class App extends Component {
  state = {
    locations: [],
    userComments: [],
    showModal: false,
    showModalForm: false,
    isLoading: true,
    deleteId: '',
    deleteRoute: '',
    showDelete: false,
    userLocation: {
      lat: '',
      long: ''
    },
    infoWindows: [],
    showMap: false,
    mapFocus: {
      lat: '',
      long: ''
    }
  }

  dev = window.location.href.includes('localhost');
  local = 'http://localhost:5000/';
  heroku = 'https://sheltered-savannah-21622.herokuapp.com/';

  componentWillMount = () => {
     navigator.geolocation.getCurrentPosition(position => {
       let url = this.dev ? this.local : this.heroku;
       fetch(url + 'basic_information/' + position.coords.latitude + '/' + position.coords.longitude)
         .then(res => res.json())
         .then(data => {
           data.locations.sort(function(a, b){
             return a.distance > b.distance;
           });
         this.setState({ locations: data.locations, isLoading: false })
         fetch(url + 'comments/')
           .then(res => res.json())
           .then(data => this.setState({ userComments: data.comments }));
         });

       this.setState({
         userLocation: {
           lat: position.coords.latitude,
           long: position.coords.longitude
         },
         mapFocus: {
           lat: position.coords.latitude,
           long: position.coords.longitude
         },
         showMap: true
       });
     });
   }

   componentDidMount = () => {
     let infoWindowArray = [];
     this.state.locations.map(spot => {
       let newWindow = false;
       return infoWindowArray.push(newWindow);
     });
     this.setState({ infoWindows: infoWindowArray });
   }

   deleteHandler = () => {
     let url = this.dev ? this.local : this.heroku;
     fetch(url + this.state.deleteRoute + this.state.deleteId, {
       method: 'DELETE',
       headers: new Headers({ 'Content-Type': 'application/json' })
     }).then(res => console.log(res)
     ).catch(err => console.log('Error:', err));
     this.setState({ showModal: false, showDelete: false });
   }

   handlePost = (data, route, type) => {
     let url = this.dev ? this.local : this.heroku;
     fetch(url + route, {
       method: type,
       body: JSON.stringify(data),
       headers: new Headers({ 'Content-Type': 'application/json' })
     }).then(res => res.json())
     .catch(err => console.log('Error:', err))
     .then(res => {
       console.log('Success:', res);
       if ((route === 'basic_information/') && (type === 'POST')) {
       setTimeout(() => { this.geoUpdateHandler(res) }, 3000);
       }
     });
   }

   googleURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
   key = '&key=AIzaSyDnXnrp-Iico9ReltN6vg3xutQ61iWHCm4'

   geoUpdateHandler = (res) => {
     let update = { latitude: '', longitude: '' }
     let route = 'basic_information/'
     fetch(this.googleURL + res.location.address + this.key)
       .then(data => data.json())
       .then(data => {
         update.longitude = data.results[0].geometry.location.lng
         update.latitude = data.results[0].geometry.location.lat
         return update
       }).then(update => this.handlePost(update, route + res.location.id, 'PUT'))
     .catch(err => console.log('Error:', err))
   }

   toggleMap = () => {
     this.setState({ showMap: !this.state.showMap })
   }

   recenterMap = (id) => {
     this.setState({
       mapFocus: {
         lat: this.state.locations[id].coordinates.latitude,
         long: this.state.locations[id].coordinates.longitude
       }
     });
   }

   toggleInfoWindow = (i) => {
     const {infoWindows} = this.state;
     infoWindows[i] = !infoWindows[i];
     this.setState({ infoWindows });
 }

   showDeleteModal = (id, route) => {
     this.setState({
       showDelete: !this.state.showDelete,
       deleteId: id,
       deleteRoute: route
     });
   }

   modal = '';

   renderModal = (i) => {
     this.modal = (
       <Modal
         place={this.state.locations[i]}
         toggle={this.toggleModalHandler}
         comments={this.state.userComments}
         post={this.handlePost}
         delete={this.showDeleteModal} /> );
   }

   toggleModalFormHandler = () => {
     this.setState({ showModalForm: !this.state.showModalForm });
   }

   toggleModalHandler = (i) => {
     if (!this.state.showModal) this.renderModal(i);
     this.setState({ showModal: !this.state.showModal });
   }


   render() {
     return (
       <div className='App'>
         <Header toggle={this.toggleModalFormHandler}/>
         <Main
           showMap={this.state.showMap}
           toggleMap={this.toggleMap}
           toggleInfoWindow={this.toggleInfoWindow}
           infoWindows={this.state.infoWindows}
           recenterMap={this.recenterMap}
           mapFocus={this.state.mapFocus}
           location={this.state.userLocation}
           spots={this.state.locations}
           toggleModal={this.toggleModalHandler}
           toggleForm={this.toggleModalFormHandler}
           post={this.handlePost}
           loading={this.state.isLoading} />
           { this.state.showModal && this.modal }
           { this.state.showModalForm && <ModalForm
               post={this.handlePost}
               toggle={this.toggleModalFormHandler} />}
           { this.state.showDelete && <DeleteModal
               decline={this.showDeleteModal}
               confirm={this.deleteHandler} /> }
       </div>
     );
   }
 }

 export default App;
