import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import PostReco from "./Components/PostReco";
import Reco from "./Components/Reco";

const themes = {
  dark: {
      color: 'white',
      background: 'black',
  },
  light: {
      color: 'black',
      background: 'white',
  }
}
export const ThemeContext = React.createContext(themes.dark)

function App() {
  const [theme, setTheme] = useState(themes.light)
  function toggleTheme() {
    if(theme === themes.dark){
      setTheme(themes.light)
    }
    else{
      setTheme(themes.dark)
    }
  }
  function allFilled (data) {
    for (var key in data) {
      if (data[key] === '' || data[key] === false){
        return false;
      }
    }
    return true;
  }

  const [fullData,setFullData] = useState([{}]);
  const callBack = (childData) => {
    if(allFilled(childData)){
      setFullData([...fullData, childData]);
    }
  }

  return (
    <>
    <ThemeContext.Provider value = {theme}>
      <Router>
      <Route
          path="/reco"
          render={(props) => ((fullData.length===1)?(
            <Redirect 
                to={{
                  pathname: '/postReco',
                  message: "show"
                }} 
              />
          ):(
              <Reco {...props} data = {fullData}/>
          )
          )}
        />
        <Route 
          path="/postReco" 
          render={(props) => <PostReco {...props} callBack = {callBack}/>} />
        <Route 
          exact path ="/" 
          render={()=>(
          <Redirect to='/postReco'/> )}/>
      </Router>
      </ThemeContext.Provider>
      <div className='theme-div'><button className = 'theme-btn' style={theme} onClick={toggleTheme}>Toggle Theme</button></div>
    </>
  );
}

export default App;
