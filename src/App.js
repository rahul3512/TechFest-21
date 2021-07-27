import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Home from './pages/HomePage/Home';
// import SignUp from './pages/SignUp/SignUp';
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
import SuperAdminRoutes from './auth/helper/SuperAdminRoutes'
import UserDashboard from './components/Dashboard/user/UserDashboard';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import SuperAdminDashboard from './components/Dashboard/superadmin/SuperAdminDashboard'
import Coordinator from './components/Dashboard/superadmin/Coordinator'
import AddDomain from './components/Dashboard/superadmin/AddDomain'
import AddEvent from './components/Dashboard/superadmin/AddEvent'
import AddWorkshop from './components/Dashboard/superadmin/AddWorkshop'
import AddWorkshopSession from './components/Dashboard/superadmin/AddWorkshopSession'
import UpdateDomain from './components/Dashboard/superadmin/UpdateDomain';
import AdminDomains from './components/Dashboard/superadmin/adminDomains';
import AdminCoordinators from './components/Dashboard/superadmin/AdminCoodinators';
import UpdateCoordinator from './components/Dashboard/superadmin/UpdateCoordinator';
import UpdateWorkshop from './components/Dashboard/superadmin/UpdateWorkshop';
import AdminWorkshops from './components/Dashboard/superadmin/AdminWorkshops';


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
        {/* <Route path='/sign-up' component={SignUp} /> */}
        <Route exact path='/' component={Home} />

        <SuperAdminRoutes path="/superadmin/dashboard" exact component={SuperAdminDashboard} />
        <SuperAdminRoutes path="/superadmin/coordinator" exact component={Coordinator} />
        <SuperAdminRoutes path="/superadmin/adddomain" exact component={AddDomain} />
        <SuperAdminRoutes path="/superadmin/addevent" exact component={AddEvent} />
        <SuperAdminRoutes path="/superadmin/addworkshop" exact component={AddWorkshop} />
        <SuperAdminRoutes path="/superadmin/addworkshopsession" exact component={AddWorkshopSession} />
        <SuperAdminRoutes
          path="/superadmin/domain/update/:domainId"
          exact
          component={UpdateDomain}
        />
        <SuperAdminRoutes
          path="/superadmin/workshop/update/:workshopId"
          exact
          component={UpdateWorkshop}
        />
        <SuperAdminRoutes
          path="/superadmin/coordinator/update/:coordinatorId"
          exact
          component={UpdateCoordinator}
        />
        <SuperAdminRoutes
          path="/superadmin/admindomains"
          exact
          component={AdminDomains}
        />
        <SuperAdminRoutes
          path="/superadmin/adminworkshops"
          exact
          component={AdminWorkshops}
        />
        <SuperAdminRoutes
          path="/superadmin/admincoordinators"
          exact
          component={AdminCoordinators}
        />

        <AlertProvider template={AlertTemplate}>
          <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        </AlertProvider>




      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
