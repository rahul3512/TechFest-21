import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Home from './pages/HomePage/Home';
import SignUp from './pages/SignUp/SignUp';
import PrIntern from './pages/PrIntern';
import Register from './pages/Register';
import Domain from './pages/Domain';
import Workshop from './pages/Workshop';
import AboutUs from './pages/AboutUs';
import Sponsor from './pages/Sponsor';
import ContactUs from './pages/ContactUs';
import ScrollToTop from './components/ScrollToTop';


import { Navbar, Footer } from './components';
import SignIn from './pages/SignIn';
import PrivateRoute from './auth/helper/privateRoutes'
import UserDashboard from './components/Dashboard/user/UserDashboard';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


function App() {
  return (
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route exact path='/pr-intern' component={PrIntern} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/domain' component={Domain} />
        <Route exact path='/workshop' component={Workshop} />
        <Route exact path='/about-us' component={AboutUs} />
        <Route exact path='/sponsors' component={Sponsor} />
        <Route exact path='/contact-us' component={ContactUs} />
        <Route path='/sign-up' component={SignUp} />
        <Route exact path='/' component={Home} />

        <AlertProvider template={AlertTemplate}>
          <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        </AlertProvider>
        

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
