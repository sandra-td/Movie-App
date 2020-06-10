import React, { useState, useEffect } from 'react';
import { string, number, bool } from 'prop-types';

const INITIAL_OFFSET = 25;
const circleConfig = {
    viewBox: '0 0 38 38',
    x: '19',
    y: '19',
    radio: '15.91549430918954'
};

const CircleProgressBarBase = ({
    className,
    strokeColor,
    strokeWidth,
    innerText,
    legendText,
    percentage,
    trailStrokeWidth,
    trailStrokeColor,
    trailSpaced,
    speed
}) => {
    let rating = 0
    const [progressBar, setProgressBar] = useState(0);
    const pace = percentage / speed;
    const updatePercentage = () => {
        setTimeout(() => {
            setProgressBar(progressBar + 1);
        }, pace);
    };

    useEffect(() => {
        if (percentage > 0) updatePercentage();
    }, [percentage]);

    useEffect(() => {
        if (progressBar < percentage) updatePercentage();
    }, [progressBar]);

    const calculatePercentage = () => {
        percentage = String(percentage)
        rating = percentage
        if (percentage.includes(".")) {
            percentage.slice(1)
            percentage *= 10
        }
        else {
            percentage *= 10
            rating += ".0"
        }
    }

    const calculateStrokeColor = () => {
        percentage = Number(percentage)
        switch (true) {
            case percentage >= 75 && percentage <= 100:
                return "#14f750"
            case percentage >= 65 && percentage < 75:
                return "yellow"
            case percentage >= 55 && percentage < 65:
                return "#ff9100"
            case percentage < 55:
                return "red"
            default:
                return "teal"
        }
    }

    calculatePercentage()

    return (
        <div className={className} style={{ display: "inline" }}>
            <svg viewBox={circleConfig.viewBox}>
                <circle
                    className="donut-ring"
                    cx={circleConfig.x}
                    cy={circleConfig.y}
                    r={circleConfig.radio}
                    fill="transparent"
                    stroke={trailStrokeColor}
                    strokeWidth={trailStrokeWidth}
                    strokeDasharray={trailSpaced ? 1 : 0}
                />
                <circle
                    className="donut-segment"
                    cx={circleConfig.x}
                    cy={circleConfig.y}
                    r={circleConfig.radio}
                    fill="transparent"
                    stroke={calculateStrokeColor()}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${progressBar} ${100 - progressBar}`}
                    strokeDashoffset={INITIAL_OFFSET}
                />
                <g className="chart-text">
                    <text x="38%" y="50%" className="chart-number">
                        {rating}
                    </text>
                    <text className="chart-icon" x="57%" y="49%" fontFamily="FontAwesome" fontSize="7px" fill="yellow">&#xf005;</text>
                </g>
            </svg>
        </div>
    );
};

CircleProgressBarBase.propTypes = {
    className: string.isRequired,
    strokeColor: string,
    strokeWidth: number,
    innerText: string,
    legendText: string,
    percentage: number,
    trailStrokeWidth: number,
    trailStrokeColor: string,
    trailSpaced: bool,
    speed: number
};

CircleProgressBarBase.defaultProps = {
    strokeColor: 'blueviolet',
    strokeWidth: 1,
    innerText: 'Completed',
    legendText: '',
    percentage: 0,
    trailStrokeWidth: 1,
    trailStrokeColor: '#d2d3d4',
    trailSpaced: false,
    speed: 1
};

export default CircleProgressBarBase;