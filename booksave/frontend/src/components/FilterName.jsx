import React from 'react'

function FilterName({ handleFilter }) {
    return (
        <div>
            <p>Filter books:</p>
            <input type="text" onChange={handleFilter} className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
    )
}

export default FilterName