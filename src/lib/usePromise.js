//더욱 간결하게 promise 사용하기 위함
//usePromise Hook
//대기 중, 완료 결과, 실패 결과에 대한 상태 관리
import {useState, useEffect} from 'react';

export default function usePromise(promiseCreator, deps){

    console.log('usePromise.js : promiseCreator', promiseCreator);
    console.log('usePromise.js : deps', deps);

    const [loading, setLoading] = useState(false);
    const [resolved, setResolved] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const process = async () => {
            setLoading(true);
            try{
                //await를 안써줬었다.
                const resolved = await promiseCreator();
                setResolved(resolved);
            }catch(e){
                setError(e);
            }
            setLoading(false);
        };

        process();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    console.log('usePromise.js : resolved', resolved);

    return [loading, resolved, error];
    //대기 중, 완료, 실패 
}