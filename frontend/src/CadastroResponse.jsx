import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => 
(
    <div>
        <h3>{ props.log }</h3>
            <button>
                <Link to="/">Back to site</Link>
            </button>
    </div>
)