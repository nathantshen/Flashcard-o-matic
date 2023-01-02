import React , {useState , useEffect} from "react";
import { useHistory } from "react-router-dom";
import {deleteDeck, listDecks} from "../utils/api/index.js"


const Home = () => {
  const [decks , setDecks] = useState([]);
  const history = useHistory();
  const getDecks = async () => {
    const data = await listDecks();
    setDecks(data);
  }
  
  useEffect(()=>{
    getDecks()
  },[])
  
  return <div>
    <button onClick= {()=> history.push(`/decks/new`)}>
      Create Deck
    </button>
    {decks.map((deck)=>{
      return <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <p>{deck.cards.length} cards</p>
        <button onClick= {()=> history.push(`/decks/${deck.id}/study`)}>
          Study
        </button>
        <button onClick = {()=> history.push(`/decks/${deck.id}`)}>
          View
        </button>
        <button onClick={async ()=>{
          const result = window.confirm("Delete this deck?");
          console.log(result);
          if(result == true){
            await deleteDeck(deck.id);
            getDecks();
          }
        }}>
          Delete
        </button>
      </div>
    })}
  </div>
}

export default Home;