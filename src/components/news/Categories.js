import React from 'react';
import styled, {css} from 'styled-components';
import {NavLink} from 'react-router-dom';

const categories = [
    {
        name: 'all',
        text: '전체'
    },
    {
        name: 'business',
        text: '비즈니스'
    },
    {
        name: 'entertainment',
        text: '연예'
    },
    {
        name: 'health',
        text: '건강'
    },
    {
        name: 'science',
        text: '과학'
    },
    {
        name: 'sports',
        text: '스포츠'
    },
    {
        name: 'technology',
        text: '기술'
    }
];

const CategoriesBlock = styled.div`
    display: flex;
    color: white;
    padding: 1rem;
    width: 768px;
    margin: 0 auto;
    
    @media screen and (max-width: 768px){
        width: 100%;
        overflow-x: auto;
    }
`;
const Category = styled(NavLink)`
    font-size: 1.125rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inherit;
    padding-botton: 0.25rem;

    //마우스 오버 시 색상 바꿈 
    &:hover{
        color: #495057;
    }

    &.active{
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;
        &:hover{
            color: #3bc9db;
        }
    }

    // //활성화되어 있을 때 
    // ${props => props.active && css `
    //     font-weight: 600;
    //     border-bottom: 2px solid #22b8cf;
    //     color: #22b8cf;
    //     &:hover{
    //         color: #3bc0db;
    //     }
    // `}


    //메뉴 간 간격 띄움 
    & + & {
        margin-left: 5rem;
    }
`;

const Categories = () => {
    //App.js 에서 전달받은 category 와 onSelect 함수 
    //초기값은 all
    console.log('Categories Component');

    return(
        <CategoriesBlock>
            {categories.map(c=>(
                //NavLink 추가 전
                // <Category
                // key={c.name}
                // active={category === c.name}
                // onClick={() => onSelect(c.name)}
                // >{c.text}</Category>

                <Category
                key={c.name}
                activeClassName="active"
                exact={c.name === 'all'}
                to={c.name === 'all' ? '/' : `/${c.name}`}
                >
                    {c.text}
                </Category>
            ))}
        </CategoriesBlock>
    )
};

export default Categories;