import React , { useState , useEffect } from "react";
import { useParams , Link , Switch , Route , useHistory } from "react-router-dom";
import { readDeck , updateDeck } from "../utils/api";



const EditDeck = () => {
  const {deckId} = useParams();
  const [deck , setDeck] = useState({});
  const [name , setName] = useState("");
  const [description , setDescription] = useState("");
  const history = useHistory();

  const getDeck = async () => {
    const data = await readDeck(deckId);
    console.log(data);
    setDeck(data);
    setName(data.name);
    setDescription(data.description);
  }

  useEffect(() => {
    getDeck();
  }, [])

  return <div>
  <Link to="/">Home</Link>
      /
      <Link to={`/decks/${deck.id}`}> {deck.name} </Link>
      / Edit Deck
      
    <form onSubmit={async (e)=>{
      e.preventDefault()
      await updateDeck({name , description , id:deck.id})
      history.push(`/decks/${deck.id}`)
      }}>
      <input value={name} onChange={(e)=>{
        setName(e.target.value)
      }}/>
      <textarea value={description} onChange={(e)=>{
        setDescription(e.target.value)
      }}></textarea>
      <button onClick= {()=> history.push(`/decks/${deck.id}`)}> Cancel </button>
      <button>Submit</button>
    </form>
  </div>
}

export default EditDeck;