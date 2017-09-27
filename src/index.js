import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import NavigationBar from './components/utils/navigation_bar';

import ClubsShow from './components/clubs/clubs_show';
import ClubImagesNew from './components/clubs/club_images_new';
import EventsIndex from './components/events/events_index';
import EventsNew from './components/events/events_new';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div> 
        <NavigationBar></NavigationBar>
        <div className="col-sm-6 col-sm-offset-3">
          <Switch>
            <Route path="/events/new" component={EventsNew} />
            <Route path="/images/club/new" component={ClubImagesNew} />
            <Route path="/clubs/:club" component={ClubsShow} />
            <Route path="/" component={EventsIndex} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('content'));
