import React , {useEffect , useState} from "react";
import { useParams , Link , Switch , Route , useHistory } from "react-router-dom";
import { readDeck , deleteDeck } from "../utils/api";

const Study = () => {
  const {deckId} = useParams();
  const [deck , setDeck] = useState({});
  const [card , setCard] = useState({});
  const [cardSide , setCardSide] = useState(1);
  const [cardIndex , setCardIndex] = useState(0);
  const [cards , setCards] = useState([]);
  const history = useHistory();
  
  const getDeck = async () => {
    const data = await readDeck(deckId);
    console.log(data)
    setDeck(data);
    setCard(data.cards[cardIndex]);
    setCardIndex(cardIndex + 1)
    setCards(data.cards);
  }

  useEffect(() => {
    getDeck();
  }, [])

  return <div>
    <Link to="/">Home</Link>
      /
      <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
      / Study
      <h1>{deck.name}: Study</h1>
      <h1>Cards</h1>
        <div>
          {cards.length <= 2 ? <div>
            <p>Not Enough Cards</p>
            <button onClick= {()=> history.push(`/decks/${deck.id}/cards/new`)}>Add card</button> </div> : 
          cardSide == 1 ? <div>
            <h1>Card {cardIndex} of {cards.length}</h1>
            <p>{card?.front}</p>
            <button onClick={()=>setCardSide(2)}>Flip</button>
          </div>:<div>
          <h1>Card {cardIndex} of {cards.length}</h1>
            <p>{card?.back}</p>
            <button onClick={()=>setCardSide(1)}>Flip</button>
            <button onClick={()=>{
              if(cardIndex >= deck.cards.length){
                const result = window.confirm("Restart cards?")
                if(result == true){
                  setCard(deck.cards[0]);
                  setCardSide(1)
                  setCardIndex(cardIndex + 1)
                } else{history.push("/")}
              } else {
                  setCard(deck.cards[cardIndex])
                  setCardSide(1)
                  setCardIndex(cardIndex + 1)
              }
            }}>Next</button>
            </div>}
        </div>
  </div>
}

export default Study;