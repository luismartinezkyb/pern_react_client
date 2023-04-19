import React, {Fragment, useState} from 'react';




const InputTodo = ({createTodo})=>{

    const [description, setDescription] = useState("");
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
                createTodo(data.description, data.todo_id);
                
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
                <button type='submit' className='btn btn-primary mt-2'>Add</button>

            </form>
            
        </Fragment>
    )
}

export default InputTodo;