import React , {useEffect , useState} from "react";
import { useParams , Link , Switch , Route , useHistory } from "react-router-dom";
import { readDeck , deleteDeck, createCard } from "../utils/api";

const AddCard = () => {
  const {deckId} = useParams();
  const [deck , setDeck] = useState({});
  const [front , setFront] = useState("");
  const [back , setBack] = useState("");
  const history = useHistory();

  const getDeck = async () => {
    const data = await readDeck(deckId);
    console.log(data)
    setDeck(data);
  }

  useEffect(() => {
    getDeck();
  }, [])

  return <div>
  <Link to="/">Home</Link>
      /
      <Link to={`/decks/${deck.id}`}> {deck.name} </Link>
      / AddCard

    <h1>{deck.name}: <span>Add Card</span></h1>
      <form onSubmit={async (e)=>{
      e.preventDefault()
      await createCard(deck.id, {front , back});
      setFront("");
      setBack("");
      }}>
      <p>Front</p>
      <textarea value={front} placeholder="Front side of card" onChange={(e)=>{
        setFront(e.target.value)
      }}></textarea>
      <p>Back</p>
      <textarea value={back} placeholder="Back side of card" onChange={(e)=>{
        setBack(e.target.value)
      }}></textarea>
      <button onClick= {()=> history.push(`/decks/${deck.id}`)}>Done</button>
      <button> Save </button>
    </form>
  </div>
}

export default AddCard;