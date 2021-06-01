import React from 'react';



const Article =({username,email})=>{
    return (
        <div className="article">
            <h3>{username}</h3>
            <p>{email}</p>
        </div>
    )
}

export default Article