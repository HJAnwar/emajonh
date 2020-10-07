import React from 'react';
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


function App() {
  return (
    <div>
      
      
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
    </div>
  );
}

export default App;
