//뉴스 정보를 보여주는 컴포넌트 
//article이라는 객체를 통째로 받아와야 함 
import React from 'react';
import styled from 'styled-components';

const NewsItemBlock = styled.div`
    // 오른쪽으로 배치 
    display: flex;
    background-color: #e6e6e6;
    border-radius: 10px;
    .thumbnail{
        //오른쪽으로 띄워짐.
        margin-right: 1rem;
        img{
            //이미지들 끼리 붙었다. 
            display: block;
            width: 160px;
            height: 100px;
            object-fit: cover;
        }
    }

    .contents{
        h2{
            color: #e6e6e6;
            margin: 0;
            a{
                color: black;
                text-decoration: none;
            }
        }
        p{
            margin: 0;
            line-height: 1.5;
            margin-top: 0.5rem;
            white-space: normal;
        }
    }
    & + &{
        margin-top: 3rem;
    }
    `;

const NewsItem = ({article}) => {
    const {title, description, url, urlToImage} = article;

    return(
        <NewsItemBlock>
            {urlToImage && (
                <div className="thumbnail">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={urlToImage} alt="thumbnail"></img>
                    </a>
                </div>
            )}
            <div className="contents">
                <h2>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h2>
                <p>{description}</p>
            </div>
        </NewsItemBlock>
    );
};

export default NewsItem;