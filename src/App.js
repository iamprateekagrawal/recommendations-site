import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import PostReco from "./Components/PostReco";
import Reco from "./Components/Reco";

function App() {

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
      <Router basename="/recommendations-site">
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
    </>
  );
}

export default App;
