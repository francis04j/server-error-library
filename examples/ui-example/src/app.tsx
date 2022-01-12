import React, { useState, useEffect } from 'react';
import call, { getList } from "./services/getList";
export interface IAffirmMessage {
    message?: String;
}


function App() {
    const [data, setData] = useState({ hits: [] });
  
    useEffect(() => {
      const fetchData = async () => {
        // const result = await getList()
    //     const result = await axios(
    //      'http://localhost:4010/affirmations',
    //    );
        const result = await call()
  
        setData(result.data);
      };
  
      fetchData();
    }, []);
  
    return (
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    );
  }
// function App(props: IAffirmMessage) {
//     const [list, setList] = useState([]);
//     let affirmations: string [] = []
//     useEffect(() => {
       
//         getList().then(items => {
            
          
//                 setList(items)
//                 affirmations = items
              
            
//         });
//        // return list;
//     }, [])


//     //source: https://www.mindbodygreen.com/articles/how-to-use-words-of-affirmation
//     console.log('here', list)
//     let isLoggedIn = list.length > 0;
//     const random = Math.floor(Math.random() * affirmations.length);
//    const affirm = props && props?.message ? props?.message : affirmations[random] 
//     return (
//         <div className="affirmation">
//             {isLoggedIn = list.length > 0}
//             <span>hello {affirm}</span>
//          <ul>
//              {isLoggedIn? list.map(item => <li key={item}>{item}</li>) : <li>here</li> }
//         </ul>
//         </div>
//     )
// }

export default App;