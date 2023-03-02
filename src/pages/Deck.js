import React , {useEffect , useState} from "react";
import { useParams , Link , Switch , Route , useHistory } from "react-router-dom";
import { readDeck , deleteDeck, deleteCard } from "../utils/api";
import Study from "./Study";

const Deck = () => {
  const {deckId } = useParams();
  const [deck , setDeck] = useState({});
  const history = useHistory();
  const getDeck = async () => {
    const data = await readDeck(deckId);
    console.log(data)
    setDeck(data);
  }

  useEffect(() => {
    getDeck();
  }, [deckId])

  return <div>

    <Link to="/">Home</Link>
    <p>/{deck.name}</p>
  <h1>{deck.name}</h1>
  <p>{deck.description}</p>
  <button onClick= {()=> history.push(`/decks/${deck.id}/edit`)}>
    Edit
  </button>
  <button onClick= {()=> history.push(`/decks/${deck.id}/study`)}>
    Study
  </button>
  <button onClick= {()=> history.push(`/decks/${deck.id}/cards/new`)}>
    Add card
  </button>
  <button onClick={async ()=>{
          const result = window.confirm("Delete this deck?");
          console.log(result);
          if(result == true){
            await deleteDeck(deck.id)
            window.location.reload();;
            history.push(`/`);
          }
        }}> 
    Delete
  </button>

  <h1>Cards</h1>
  {deck.cards?.map((card, index)=>{
    return <div key={index}>
      <p><strong>
        {card.front}
        </strong></p>
      <p>{card.back}</p>
      <button onClick= {()=> history.push(`/decks/${deck.id}/cards/${card.id}/edit`)}>
        Edit
      </button>
      <button onClick={async ()=>{
          const results = window.confirm("Delete this card?");
          console.log(results);
          if(results == true){
            await deleteCard(card.id);
            window.location.reload()
            history.push(`/decks/${deck.id}`);
          }
        }}>
        Delete
      </button>
    </div>
  })}
  </div>
}

export default Deck;
