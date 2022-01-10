import React, { useEffect, useState } from 'react';
import { getList } from "./services/getList";
export interface IAffirmMessage {
    message?: String;
}
function App(props: IAffirmMessage) {
    const [list, setList] = useState([]);
    let affirmations: string [] = []
    useEffect(() => {
       
        getList().then(items => {
            let mounted = false
            if(!mounted) {
                setList(items)
                affirmations = items
                mounted = true;
            }
        })
       // return list;
    }, [])


    //source: https://www.mindbodygreen.com/articles/how-to-use-words-of-affirmation
    console.log('here', list)
    let isLoggedIn = list.length > 0;
    const random = Math.floor(Math.random() * affirmations.length);
   const affirm = props && props?.message ? props?.message : affirmations[random] 
    return (
        <div className="affirmation">
            {isLoggedIn = list.length > 0}
            <span>hello {list.length}</span>
         <ul>
             {isLoggedIn? list.map(item => <li key={item}>{item}</li>) : <li>here</li> }
        </ul>
        </div>
    )
}

export default App;