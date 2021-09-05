//API를 요청하고 데이터가 있는 배열을 컴포넌트 배열로 변환하여 렌더링함 
import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../../lib/usePromise';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    //아래 간격 띄웠음
    padding-bottom: 3rem;
    width: 768px;
    //오른쪽으로 띄워졌음
    margin: 0 auto;
    margin-top: 2rem;

    .loading{
        color: white;
        text-align: center;
        font-size: 4rem;
    }

    
    

    @media screen and (max-width: 768px){
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

// //임시 데이터 
// const sampleArticle = {
//     title: '제목', 
//     description: '내용',
//     url: 'https://google.com',
//     urlToImage: 'https://via.placeholder.com/160'
// };



const NewsList = ({category}) => {

    console.log('NewsList comp.', category);
    
//usePromise 적용하기 전
/*
    const [articles, setArticles] = useState(null);
    //API 요청이 대기중인지 판별하기 위한 상태
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //async를 사용하는 함수 따로 선언
        //메뉴별로 진행해야 함 
        const fetchData = async() => {
            setLoading(true);
            try{

                const query = category === 'all' ? '' : `&category=${category}`;

                const response = await axios
                .get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=52d4ad5cbb894b9a826830661a5b6bb6`);
                
                setArticles(response.data.articles);

            }catch(e){
                console.log(e);
            }
            setLoading(false);
        };

        fetchData();
    }, [category]);//여기에 category를 안 넣으면 
    // React Hook useEffect has a missing dependency: 'category'. 
    //Either include it or remove the dependency array
    //이런 오류가 뜬다. 의존 배열 

    if(loading){
        return (
            <NewsListBlock>
                <div className="loading">로딩중...</div>
            </NewsListBlock>
        ) 
    }

    if(!articles){
        return null;
    }
*/

    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=52d4ad5cbb894b9a826830661a5b6bb6`);
    }, [category]);

    console.log('NewsList comp. : response : ', response);

    if(loading){
        return (
            <NewsListBlock>
                <div className="loading">로딩중...</div>
            </NewsListBlock>
        ) 
    }

    //response 값이 설정되지 않았을 경우 
    if(!response){
        return null;
    }

    if(error){
        return (
            <NewsListBlock>
                <div className="loading">에러 발생</div>
            </NewsListBlock>
        ) 
    }

    const { articles } = response.data;

    return(
        <NewsListBlock>
            {/* <NewsItem article={sampleArticle}></NewsItem>
            <NewsItem article={sampleArticle}></NewsItem>
            <NewsItem article={sampleArticle}></NewsItem>
            <NewsItem article={sampleArticle}></NewsItem>
            <NewsItem article={sampleArticle}></NewsItem> */}
            {articles.map(article => (
                <NewsItem key={article.url} article={article}/>
            ))}
        </NewsListBlock>
    )
};

export default NewsList;