// react
import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore';

// pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// components
import Header from './components/header/header.component';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';


// styles
import './App.css';


class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {
      if(userAuth){
        const userDocRef = await createUserProfileDocument(userAuth);

        onSnapshot(userDocRef, (doc) => {
          setCurrentUser({
            ...doc.data()
          });
        });
      }
      setCurrentUser( userAuth );
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component = {HomePage}/>
          <Route path='/shop' component = {ShopPage}/>
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
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect( mapStateToProps, mapDispatchToProps )(App);
