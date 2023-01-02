import React, { useEffect, useState } from "react";
import { Route , Switch } from "react-router-dom"
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../pages/Home";
import Deck from "../pages/Deck";
import Study from "../pages/Study";
import CreateDeck from "../pages/CreateDeck";
import EditDeck from "../pages/EditDeck";
import AddCard from "../pages/AddCard";
import EditCard from "../pages/EditCard";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/decks/new" exact>
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId" exact>
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study" exact>
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit" exact>
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new" exact>
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit" exact>
            <EditCard />
          </Route>
          <Route path="">
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
