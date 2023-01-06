const CardForm = ({onSubmit, front, setFront, back, setBack, children}) => {
    return <form onSubmit={onSubmit}>
        <p>Front</p>
        <textarea value={front} placeholder="Front side of card" onChange={(e)=>{
          setFront(e.target.value)
        }}></textarea>
        <p>Back</p>
        <textarea value={back} placeholder="Back side of card" onChange={(e)=>{
          setBack(e.target.value)
        }}></textarea>
        {children}
      </form>     
}

export default CardForm