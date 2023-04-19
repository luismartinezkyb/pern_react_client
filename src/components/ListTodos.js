import React, {Fragment, useEffect, useState} from 'react';
import EditTodo from './EditTodo';
import InputTodo from './InputTodo';

export default function ListTodos({todos, setTodos}) {
    //Bandera para saber si es que el elemento esta siendo editado o creado
    const [flag, setFlag]=useState(true);

    const [newTodo, setNewTodo] = useState({});

    //funciton para crear el todo
    const createTodo = (description, todo_id)=>{
        setTodos([...todos, {
            todo_id,
            description
        }]);
        setFlag(true);
    }

    const updateTodo = (incomingTodo)=>{
        console.log(incomingTodo)
        setFlag(true);
    }

    //function cuando Edit sea presionado tiene que cambiar el estado a true y mandar el 
    const onUpdate =(id)=>{
        console.log("nuevo todo",todos[todos.map(e=>e.todo_id).indexOf(id)])
        setNewTodo(todos[todos.map(e=>e.todo_id).indexOf(id)]);
        
        setFlag(false);

    }
    const onDelete = async(id)=>{
        try {
            const response = await fetch(`http://localhost:3001/todo/delete/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data)
            setTodos(todos.filter(todos => todos.todo_id !== id))
        } catch (error) {
            
        }
    }
    

    
    return (
    <Fragment>
        {flag ? <InputTodo createTodo={createTodo}/> : <EditTodo updateTodo={updateTodo} newTodo={newTodo}/>}
        <table className="table mt-5">
            <thead>
                <tr>
                <th>id</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map(e=>(
                        <tr key={e.todo_id}>
                        <td>{e.todo_id}</td>
                        <td>{e.description}</td>
                        <td><button onClick={()=>onUpdate(e.todo_id)} className="btn btn-primary">Edit</button></td>
                        <td><button className='btn btn-danger' onClick={()=>onDelete(e.todo_id)}>Delete</button></td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>

    </Fragment>
    )
}
