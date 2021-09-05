import React from 'react';
import Categories from '../components/news/Categories';
import NewsList from '../components/news/NewsList';

const NewsPage = ({match}) => {
    //{match}인데 match로해서 오류가 났었음 
    // Cannot read properties of undefined (reading 'category')
    console.log('NewsPage Component', match);

    const category = match.params.category || 'all';

    return (
        <>
            <Categories />
            <NewsList category={category}/>
        </>
    )
    
}

export default NewsPage;