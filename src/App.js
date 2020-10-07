import React, { createContext, useState } from 'react';
import Header from './Component/Header/Header';
import Shope from './Component/Shope/Shope';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotFount from './Component/NotFount/NotFount';
import Review from './Component/Review/Review';
import Inventory from './Component/Inventory/Inventory';
import Login from './Login/Login';
import ProductDetail from './Component/ProductDetail/ProductDetail';
import Address from './Component/Address/Address';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';

export const UserContext= createContext();

function App() {

  const [loggedInUser, setLoggedInUser]=useState({});
  return (
    <div>
      
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path ='/shop'>
            <Shope></Shope>
          </Route>
          <Route  path ='/review'>
            <Review></Review>
          </Route>
          <Route  path ='/login'>
            <Login></Login>
          </Route>
          <PrivateRoute  path ='/address'>
            <Address></Address>
          </PrivateRoute>
          <Route  path ='/product/:productKey'>
            <ProductDetail></ProductDetail>
          </Route>
          <Route  path ='/manage'>
            <Inventory></Inventory>
          </Route>
          <Route exact  path ='/'>
            <Shope></Shope>
          </Route>
          <Route  path ='*'>
            <NotFount></NotFount>
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
