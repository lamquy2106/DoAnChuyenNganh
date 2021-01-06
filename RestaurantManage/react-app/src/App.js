import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import Admin from "./components/Admin";
import Customer from "./components/Customers";
import ProductType from "./components/ProductTyppe";
import Product from "./components/Products";

//import logo from "./logo.svg";
//import "./App.css";
// import DefauLayout from "./containers/defauLayout";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { Component } from "react";
//import Admin from "./components/Admin";
//import Customer from "./components/Customers";
//import Home from "./components/home";
function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <Admin />
          {/* <Customer /> */}
          {/* <ProductType /> */}
          {/* <Product /> */}
        </Container>
      </ToastProvider>
    </Provider>
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path="/home" name="Home page" component={Home}></Route>
    //     <Route path="/" name="Home page" component={DefauLayout}></Route>
    //     <Route
    //       path="/customer"
    //       name="Customer page"
    //       component={Customer}
    //     ></Route>
    //     <Route path="/admin" name="Admin page" component={Admin}></Route>
    //   </Switch>
    // </BrowserRouter>
  );
}

export default App;
