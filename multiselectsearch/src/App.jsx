import React from 'react'
import Maincontainer from './Maincontainer';
import store from './utils/store';
import {Provider} from "react-redux"
import  "./App.css";


const App = () => {
  return (
    <Provider store={store}>
    <div>
       <Maincontainer/>
    </div>
    </Provider>
  )
}

export default App
