
import React, {Fragment, useEffect, useState} from 'react';
export default function EditTodo({updateTodo, newTodo}) {
    console.log(newTodo)
    const [description, setDescription] = useState(newTodo.description);

    const cancelTodo = ()=>{
        setDescription("");
    }
    const onSubmitForm = async(e) =>{
        e.preventDefault();
        try {
            
            const body = {description};
            const response = await fetch("http://localhost:3001/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            let data = await response.json();
            //console.log("data", data)
            if(response.status === 200){
                setDescription("");
                console.log("DATASSS",data.description, data.todo_id)
                updateTodo(data.description, data.todo_id);
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Fragment>
            <h1 className='text-center mt-5'>Pern Todo List</h1>
            <form className='d-flex mt-4' onSubmit={onSubmitForm}>
                <input type='text' className='form-control' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                <button type='submit' className='btn btn-primary mt-2'>Edit</button>
                <button onClick={cancelTodo} className='btn btn-danger mt-2'>Cancel</button>

            </form>
            
        </Fragment>
    )
}
