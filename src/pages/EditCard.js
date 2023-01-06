import React , {useEffect , useState} from "react";
import { useParams , Link , Switch , Route , useHistory } from "react-router-dom";
import { readDeck , readCard, updateCard } from "../utils/api";
import CardForm from "../components/CardForm";

const EditCard = () => {
  const {deckId , cardId } = useParams();
  const [deck , setDeck] = useState({});
  const [front , setFront] = useState("");
  const [back , setBack] = useState("");
  const history = useHistory();
  const [card , setCard] = useState({});

  const getDeck = async () => {
    const data = await readDeck(deckId);
    console.log(data)
    setDeck(data);
  }
  const getCard = async () => {
    const data = await readCard(cardId);
    console.log(data)
    setCard(data);
    setFront(data.front);
    setBack(data.back);
  }
  
  useEffect(() => {
    getDeck();
    getCard();
  }, [deckId])

  return <div>
  <Link to="/">Home</Link>
      /
      <Link to={`/decks/${deck.id}`}> {deck.name} </Link>
      / Edit Card {cardId}

      <h1>Edit Card</h1>
    <CardForm onSubmit={async (e)=>{
      e.preventDefault()
      console.log({front,back,id:card.id, deckId})
       await updateCard({front , back , id:card.id, deckId:Number(deckId)});
       history.push(`/decks/${deck.id}`)
      }} front = {front} setFront={setFront} back = {back} setBack = {setBack}>
          <button onClick= {()=> history.push(`/decks/${deck.id}`)}>Cancel</button>
          <button > Submit </button>
      </CardForm>
  </div>
}

export default EditCard;