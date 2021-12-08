import './App.scss'
import { Route, Switch } from 'react-router-dom'
import Header from './component/Header/Header';
import Courses from './Pages/Courses/Couses';
import Home from './Pages/Home/Home'
import Teachers from './Pages/Teachers/Teachers'

function App() {
  return (
    <div className="container">
      <Header>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/courses' component={Courses} />
          <Route path='/teachers' component={Teachers} />
        </Switch>
      </Header>
    </div>
  );
}

export default App;
