// react
import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


// pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

// components
import Header from './components/header/header.component';
import { selectCurrentUser } from './redux/user/user.selectors';


// styles
import './App.css';


class App extends Component {

  componentDidMount(){
    
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component = {HomePage}/>
          <Route path='/shop' component = {ShopPage}/>
          <Route exact path='/checkout' component = {CheckoutPage}/>
          <Route  
            exact 
            path='/signIn' 
            render={ () =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : ( 
                <SignInAndSignUpPage />
              )
            } 
          />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps =  createStructuredSelector({
  currentUser: selectCurrentUser,
})


export default connect( mapStateToProps )(App);
