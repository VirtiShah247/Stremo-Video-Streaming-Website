import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './components/home';
import Signin from './components/signIn';
import Signup from './components/signUp';
import Videos from './components/video';
import MovieList from './components/movieList';
import SearchList from './components/searchList';
import Movie from "./components/movie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/videos/:url' element={<Videos />}></Route>
        <Route path='/browse' element={<MovieList />}></Route>
        <Route path='/search' element={<SearchList />}></Route>
        <Route path='/movie' element={<Movie/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
