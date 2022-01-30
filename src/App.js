// react
import { Component } from 'react'

// firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore';

// pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// components
import Header from './components/header/header.component';
import { Switch, Route } from 'react-router-dom';

// styles
import './App.css';


class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {
      if(userAuth){
        const userDocRef = await createUserProfileDocument(userAuth);

        onSnapshot(userDocRef, (doc) => {
          this.setState({
            currentUser: {
              ...doc.data()
            }
          });
        });
      }
      this.setState({ currentUser: userAuth });
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component = {HomePage}/>
          <Route path='/shop' component = {ShopPage}/>
          <Route path='/signIn' component = {SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }

}

export default App;
