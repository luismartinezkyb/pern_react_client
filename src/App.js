import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
//components

import ListTodos from './components/ListTodos';




function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = async()=>{
    try {
        const response = await fetch("http://localhost:3001/todos");
        const data = await response.json();
        console.log(data)
        if(response.status===200) setTodos(data);
        
    } catch (error) {
        console.log(error)
    }
    
  }
  
  
  useEffect(()=>{
    getTodos();
  },[])
  return (
    <Fragment >
      <div className='container'>
        
        <ListTodos todos={todos} setTodos={setTodos}/>
      </div>      
      
    </Fragment>
  );
}

export default App;
