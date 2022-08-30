import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from '../pages/login';
import Register from '../pages/register';
import Order from '../pages/order';
import OrderView from '../pages/order/view';
import OrderEdit from '../pages/order/edit';
import OrderCreate from '../pages/order/create';
import Client from '../pages/client';
import User from '../pages/user';
import UserCreate from '../pages/user/create';
import ClientCreate from '../pages/client/create';
import ClientEdit from '../pages/client/edit';
import UserEdit from '../pages/user/edit';
import Cookies from 'js-cookie'
import Header from '../pages/header'
import Ssl from '../../public/2A6E673EDDD182AECD9BED4609D0F7D3.txt'

function isAuth(){
  var token = Cookies.get('token')
  if(token) {
    return true
  } else {
    return false
  }
}

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
      <Route {...rest} render={props => (
          isAuth()
          ? [<Header />, <Component {...props} />]
          : <Redirect to="/" />
      )} />
  );
};

export default function Routes() {
  return (
    <Router>
      <Route exact path="/.well-known/pki-validation/2A6E673EDDD182AECD9BED4609D0F7D3" component={Ssl} />
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/order" component={Order} />
      <PrivateRoute path="/orderView" component={OrderView} />
      <PrivateRoute path="/orderEdit" component={OrderEdit} />
      <PrivateRoute path="/orderCreate" component={OrderCreate} />
      <PrivateRoute path="/client" component={Client} />
      <PrivateRoute path="/clientCreate" component={ClientCreate} />
      <PrivateRoute path="/clientEdit" component={ClientEdit} />
      <PrivateRoute path="/user" component={User} />
      <PrivateRoute path="/userCreate" component={UserCreate} />
      <PrivateRoute path="/userEdit" component={UserEdit} />
    </Router>
  );
}
