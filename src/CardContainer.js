import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import Card from "./Card";


/* CardContainer: uses deck API, allows drawing card at a time. */

function CardContainer() {

    let shuffleBaseURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    let baseURL = 'https://deckofcardsapi.com/api/deck'
    const timerId = useRef(null)

    const [deckID, setDeckID] = useState(null);
    const [cards, setCards] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false);

    /* At mount: load deck from API into state. */
    useEffect(function getDeckWhenMounted() {
        async function getDeck() {
            let res = await axios.get(shuffleBaseURL);
            setDeckID(res.data.deck_id);
        };
        getDeck()
    }, [])


    /* Draw a card via API, if there are still cards remaining then add card to state "cards" list */
    async function getCard() {
        let resp = await axios.get(`${baseURL}/${deckID}/draw/`);
        if (resp.data.remaining === 0) {
            alert('No cards remaining!');
            setAutoDraw(false);
        } else {
            let card = resp.data['cards'][0];

            setCards(cards => [...cards, card]);
        }
    };

    /* Draw one card every second if autoDraw is true */
    useEffect(function autoDrawing() {
        if (autoDraw) {
            timerId.current = setInterval(getCard, 1000);
        }
        return () => {
            clearInterval(timerId.current);
            timerId.current = null;
        }
    }, [autoDraw])


    const toggleAutoDraw = () => {
        setAutoDraw(autoDraw => !autoDraw);
        console.log(autoDraw)
    };


    const renderCards = () => {
        return (
            cards.map(card => (
                <div key={card.id}>
                    <Card key={card.id} image={card.image} />
                </div>
            ))
        )
    }


    return (
        <div>
            {deckID ? <button onClick={toggleAutoDraw}>{!autoDraw ? "Draw Card" : "Stop Drawing"}</button> : "loading"}
            {renderCards()}
        </div>
    );
}

export default CardContainer;


