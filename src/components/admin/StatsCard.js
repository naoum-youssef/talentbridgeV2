import React from 'react';
import '../../styles/base.css';

const StatsCard = ({
                       title,
                       value,
                       icon,
                       trend = null, // { value: number, direction: 'up' | 'down' }
                       color = 'primary',
                       onClick,
                       showViewMore = false
                   }) => {
    const cardClass = `stats-card stats-card-${color}`;

    const renderTrend = () => {
        if (!trend) return null;

        const { value, direction } = trend;
        const trendClass = `stats-trend stats-trend-${direction}`;
        const trendIcon = direction === 'up' ? '↑' : '↓';

        return (
            <div className={trendClass}>
                <span className="stats-trend-icon">{trendIcon}</span>
                <span className="stats-trend-value">{value}%</span>
            </div>
        );
    };

    return (
        <div className={cardClass} onClick={onClick}>
            <div className="stats-card-icon">
                {icon}
            </div>
            <div className="stats-card-content">
                <h4 className="stats-card-title">{title}</h4>
                <div className="stats-card-value-container">
                    <div className="stats-card-value">{value}</div>
                    {renderTrend()}
                </div>
                {showViewMore && (
                    <div className="stats-card-view-more">
                        View Details &rarr;
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;