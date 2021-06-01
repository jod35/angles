import React from 'react';
import Article from './Article'


const Articles=({list})=>{

    const returnArticles =(items)=>{
        return items.map((item,index)=>{return <Article key={index} username={item.username} email={item.email}/>})

    }
    return(
        <div className="artilcles">
            {returnArticles(list)}
        </div>
    )
}


export default Articles