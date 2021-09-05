import React, {useState} from "react";
import axios from 'axios';
import {Route} from 'react-router-dom';
import NewsPage from "./pages/NewsPage";
//52d4ad5cbb894b9a826830661a5b6bb6

const App = () => {

    //라우터 사용으로 이 코드들은 없어도 됨 
    //category 값을 url parameter 통해서 제어 할 것이기 때문
    //onSelect 함수도 전달 안해줘도 됨 

    // const [category, setCategory] = useState('all');
    // //category 값을 업데이트하는 함수.
    // //다른 메뉴 선택할 때도 useCallback 때문에 실행됨 
    // const onSelect = useCallback(category => setCategory(category), []);


    const [data, setData] = useState(null);


    const onClick = () => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => {
                setData(response.data);
            });
    };

    const onClick_async = async() => {
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
            setData(response.data);
        }catch(e){
            console.log(e);
        }
    };

    const onClickNewsEntire = async() => {
        try{
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=kr&apiKey=52d4ad5cbb894b9a826830661a5b6bb6');
            setData(response.data);
        }catch(e){
            console.log(e);
        }
    };

    const onClickNewsCategory = async() => {
        try{
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=52d4ad5cbb894b9a826830661a5b6bb6');
            setData(response.data);
        }catch(e){
            console.log(e);
        }
    }

    return(

        <div>
            <div>
                {/* <Categories category={category} onSelect={onSelect}/>
                <NewsList category={category} />
                아래 코드에서 category? ?뜻은 category값이 선택적이라는 말이다. 
                */}
                <Route path="/:category?" component={NewsPage}></Route>
            </div>
            <br/>
            <hr/>
            <div>
                <div>
                    <h1>axios 테스트</h1>
                </div>
                <button onClick={onClick}>그냥 axios 불러오기</button>
                <button onClick={onClick_async}>async axios 불러오기</button>
                <br></br>
                <div>
                   {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true}></textarea>}
               </div>
            </div>
           
            <br/>
            <hr/>

            <div>
                <div>
                 <h1>news 불러오기</h1>
                </div>
                <button onClick={onClickNewsEntire}>헤드라인 불러오기</button>
                <button onClick={onClickNewsCategory}>특정 카테고리 불러오기</button>
                <div>
                    {data && <textarea rows={7} value={JSON.stringify(data, null, 2)}></textarea>}
                </div>
            </div>
        </div>
    )

    
};

export default App;