import React, {useEffect,useState}from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID="1c39c7d5";
  const APP_KEY="e75b3853372f060d4a88e93d73535d85";

    // what ever data gets sent back
    // everything is stored in recipes
    const [recipes,setRecipes] = useState([]);

    const [search,setSearch] = useState("");

    const [query,setQuery] = useState('chicken');

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(()=> {
      getRecipes();
    },[query]); // this will run everytime you type in search bar
    // 1 spepcifc thing to run, wehn counter changes

    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json(); // when data doesnt arrive quick
      setRecipes(data.hits);
    };

  const updateSearch = e => {
      setSearch(e.target.value); // value of the input
  }

  // on submit form
  const getSearch = e => {
    e.preventDefault();// will prevent constant refresh
    setQuery(search);
  }

  return (
    <div className="App">
      <form onSubmit ={getSearch} className="search-form">
        <input
        className="Search-bar" type="text" value={search} onChange={updateSearch}/>
        <button
        className="search-button" type="submit">search</button>
      </form>
      {recipes.map(recipe =>(
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))};
    </div>
  );
};

export default App;
