import { connect } from 'react-redux';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Register from './components/register/register.component';
import Login from './components/login/login.components';
import DashBoard from './components/dashboard/dashboard.components';
import Addworker from './components/addworker/addworker.components';
import Addclient from './components/addclient/addclient.components';
import Addjob from './components/addjob/addjob.cpmponents';
import NavBar from './components/navbar/navbar.component';
import Payments from './components/workerpayments/workerpayments.components';

const App = () => (

  <div className="App">
    <NavBar />
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/dashboard' component={DashBoard} />
      <Route path='/addworker' component={Addworker} />
      <Route path='/addclient' component={Addclient} />
      <Route path='/addjob' component={Addjob} />
      <Route path='/payments' component={Payments} />
    </Switch>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#343a40" fill-opacity="1" d="M0,128L48,160C96,192,192,256,288,250.7C384,245,480,171,576,154.7C672,139,768,181,864,176C960,171,1056,117,1152,128C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
  </div>
)

export default App;
