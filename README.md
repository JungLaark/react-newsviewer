# Making news-viewer with axios

## Setting
    - yarn add axios 
    - https://newsapi.org 사이트를 이용한다. 
    - 가입 후 api key 받기 
## 주요코드 
```javascript
    const onClickNewsEntire = async() => {
        try{
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=kr&apiKey=');
            setData(response.data);
        }catch(e){
            console.log(e);
        }
    };

    const onClickNewsCategory = async() => {
        try{
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=');
            setData(response.data);
        }catch(e){
            console.log(e);
        }
    }
```
## UI 만들기 
    - yarn start styled-components
## 데이터 연동 
    - 컴포넌트가 화면에 보이는 시점에 API 요청. 
    - useEffect를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API 요청 
    - 주의할 점: useEffect에 등록하는 함수에 async를 붙이면 안된다. useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문.
    - 뒷정리 함수? cleanup : 메모리 누수 방지를 위해 컴포넌트를 제거하기 전 수행 
    -> 함수 내부에 async 키워드가 붙은 함수를 따로 만들어서 사용해야 함 

## Header에 Category 추가 
    - useState로 상태관리 
    - category값을 업데이트하는 onSelect함수 생성
    - App.js 에서 props를 보내 초기화하고 useCallback을 사용해 이벤트 주고 받기 가능

## category 별로 데이터 가져오기 
```javascript
const query = category === 'all' ? '' : `&category=${category}`;
const response = await axios
                .get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=52d4ad5cbb894b9a826830661a5b6bb6`);
                
```
    - useEffect 에 의존 배열 추가해줘야 함. 안하면 
            // React Hook useEffect has a missing dependency: 'category'. 
            //Either include it or remove the dependency array
    이런 오류가 뜬다.
    이유는 category 값이 바뀔 때마다 뉴스를 새로 불러와야 하는데  

## react router 추가    
### Route 추가 
```bash
yarn add react-router-dom
```
    - index.js 에 BrowserRouter 추가 
    - App.js 에 Route 추가 
```html
<Route path="/:category?" component={NewsPage}></Route>
```
    - category? 에서 ? 뜻은 category 값이 있을 수도 있고 없을 수도 있다는 뜻이다. 
    - 지금까지 했을 때는  NewsPage.js 에서
    - Cannot read properties of undefined (reading 'category')
    - 이런 에러가 뜬다. 
    - {}를 안해줘서 그럼

### NavLink 추가 
```html
 <Category
    key={c.name}
    activeClassName="active"
    exact={c.name === 'all'}
    to={c.name === 'all' ? '/' : `/${c.name}`}
    >
        {c.text}
    </Category>
```

## Custom Hook 만들기 
    - src/lib 폴더 생성.
    - usePromise.js 파일 생성
    - usePromise Hook : 대기 중, 완료 결과, 실패 결과에 대한 상태 관리.
    - NewsList 컴포넌트에서 usePromise 사용
