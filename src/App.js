
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API
  name='Aditya';
  state = {
    progress:0,
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    
    

    return (

      <div>
      
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        
      />
        

      
        <NavBar/>
        <Routes>
        <Route exact  path="/"  element={<News setProgress ={this.setProgress} key="general" pageSize={6} category="general" country="in" />} />
        <Route exact  path="/business"  element={<News setProgress ={this.setProgress} key="business" pageSize={6} category="business" country="in" />} />
        <Route exact  path="/entertainment"  element={<News setProgress ={this.setProgress} key="entertainment" pageSize={6} category="entertainment" country="in" />} />
        <Route exact  path="/general"  element={<News setProgress ={this.setProgress} key="general" pageSize={6} category="general" country="in" />} />     
        <Route exact  path="/health"  element={<News setProgress ={this.setProgress} key="health" pageSize={6} category="health" country="in" />} />
        <Route exact  path="/science"  element={<News setProgress ={this.setProgress} key="science" pageSize={6}  category="science" country="in" />} />
        <Route exact  path="/sports" element={<News setProgress ={this.setProgress}  key="sports" pageSize={6} category="sports" country="in" />} />
        <Route exact  path="/technology"  element={<News setProgress ={this.setProgress} key="technology" pageSize={6} category="technology" country="in" />} />        


        </Routes>
        
        
       
       
        </Router>
      </div>
    )
  }
}

