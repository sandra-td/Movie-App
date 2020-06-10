import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card';

const GridDisplay = ({
    heading,
    mainLink,
    mainLinkNoId,
    items,
    id
}) => {

    const renderCards = () => {
        return (
            items.map(item => {
                return (
                    <Card item={item} key={item.id} />
                )
            })
        )
    }

    const renderContent = () => {
        return (
            <div className="cast-container">
                <div className="movie-card-header">
                    <h3>{heading}</h3>
                    {mainLink && <Link to={`${mainLink}${id}`}  >  <span className="movie-more-link"> View more </span></Link>}
                    {mainLinkNoId && <Link to={`${mainLinkNoId}`}  >  <span className="movie-more-link"> View more </span></Link>}
                </div>
                <div className="cast-list">
                    {renderCards()}
                </div>
            </div>
        )
    }

    return (
        <>
            {renderContent()}
        </>
    )
}

export default GridDisplay;