import './App.scss'
import Courses from './Pages/Courses/Couses';
import Home from './Pages/Home/Home'
import Teachers from './Pages/Teachers/Teachers'

function App() {
  return (
    <div className="container">
      <Home />
      <Teachers />
      <Courses />
    </div>
  );
}

export default App;
