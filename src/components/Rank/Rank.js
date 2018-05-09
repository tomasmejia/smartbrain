import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className="gugi white f2">
                {`${name}, your current entry count is...`}
            </div>
            <div className="gugi white f1">
                {entries}
            </div>
        </div>
    )
}
export default Rank;