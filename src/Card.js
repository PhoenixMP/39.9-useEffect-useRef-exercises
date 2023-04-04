import React from "react";

/** Single card: just renders the card as received from cardContainer. */

function Card({ image }) {

    return (

        <div style={{ width: "225px", height: "320px", backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat" }}>

        </div>

    );
}

export default Card;
