import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk';
import localForage from 'localforage'


import {Image, Grid, Row, Col} from 'react-bootstrap';


import reducers from './reducers';

import NavigationBar from './components/utils/navigation_bar';

import ClubsShow from './components/clubs/clubs_show';
import ClubImagesNew from './components/clubs/club_images_new';
import EventsIndex from './components/events/events_index';
import EventsNew from './components/events/events_new';
import ExploreIbiza from './components/explore/explore_ibiza';
import LoginPage from './components/login/login';
import Cart from './components/cart/cart';
import MerchandiseStore from './components/merchandise/merchandise_store';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const middleware = [thunk];
let store = compose(
  applyMiddleware(...middleware),
  autoRehydrate()
)(createStore)(reducers);
persistStore(store, {storage: localForage});


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Grid className="container-fluid"> 
        <Row>
          <NavigationBar></NavigationBar>
        </Row>
        <Row>
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route path="/clubs/:club" component={ClubsShow} />
            <Route path="/images/club/new" component={ClubImagesNew} />
            <Route path="/login" component={LoginPage} />
            <Route path="/ibiza_merchandise" component={MerchandiseStore} />
            <Route path="/events/new" component={EventsNew} />
            <Route authorize={['admin']} path="/explore_ibiza" component={ExploreIbiza} />
            <Route path="/" component={EventsIndex} />
          </Switch>
        </Row>
      </Grid>
    </BrowserRouter>
  </Provider>
  , document.getElementById('content'));
