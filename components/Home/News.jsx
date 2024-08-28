import React from 'react'
import Cards from '../UI/Cards'

const News = ({news}) => {
  return (
    <Cards cardsData={news.items}/>
  )
}

export default News