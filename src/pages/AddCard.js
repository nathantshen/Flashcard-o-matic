import React , {useEffect , useState} from "react";
import { useParams , Link , Switch , Route , useHistory } from "react-router-dom";
import { readDeck , deleteDeck, createCard } from "../utils/api";
import CardForm from "../components/CardForm";

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
  }, [deckId])

  return <div>
  <Link to="/">Home</Link>
      /
      <Link to={`/decks/${deck.id}`}> {deck.name} </Link>
      / AddCard

    <h1>{deck.name}: <span>Add Card</span></h1>
    <CardForm onSubmit={async (e)=>{
      e.preventDefault()
      await createCard(deck.id, {front , back});
      setFront("");
      setBack("");
      }} front = {front} setFront = {setFront} back = {back} setBack = {setBack}>
        <button onClick= {()=> history.push(`/decks/${deck.id}`)}>Done</button>
        <button> Save </button>
      </CardForm>
  </div>
}

export default AddCard;