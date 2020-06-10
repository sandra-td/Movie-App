import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";


const StarRating = (props) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleClick = (ratingValue) => {
        setRating(ratingValue)
        props.setUserRating(ratingValue)

    }
    return (
        <div className="rating-container">
            {[...Array(5)].map((item, i) => {
                const ratingValue = i + 1;
                return (
                    <label title={`Rate with ${ratingValue * 2}`}>
                        <input type="radio"
                            name="rating"
                            className="rating-input"
                            value={ratingValue}
                            onClick={() => handleClick(ratingValue)}
                        />
                        <FaStar
                            className="star"
                            size={30}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "e4e7e9"}
                        />
                    </label>
                )
            }
            )}
        </div>
    )
}


export default StarRating;