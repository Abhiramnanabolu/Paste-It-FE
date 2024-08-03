import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import View from './Components/View'


const App=()=>{
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:id" component={View} />
      </Switch>
    </Router>
  )
}

export default App;
