import React , {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

const CreateDeck = () => {
  const [name , setName] = useState("");
  const [description , setDescription] = useState("");
  const history = useHistory();

  return <div>
  <Link to="/">Home</Link>
    <p>/ Create Deck</p>
    <h1>Create Deck</h1>
  <form onSubmit={async (e)=>{
    e.preventDefault()
    const data = await createDeck({name , description})
    console.log(data);
    history.push(`/decks/${data.id}`)
  }}>

    <input value={name} onChange={(e)=>{
      setName(e.target.value)
    }}/>
    <textarea value={description} onChange={(e)=>{
      setDescription(e.target.value)
    }}></textarea>
    <button>Submit</button>
    <button onClick= {()=> history.push(`/`)}> Cancel </button>
  </form>
  </div>
}

export default CreateDeck;