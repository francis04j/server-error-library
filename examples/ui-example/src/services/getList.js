import axios from 'axios';

export function getList() {
    return fetch('http://localhost:4010/affirmations')
      .then(data => data.json())
  }
  // source
const call = async () =>  await axios(
    'http://localhost:4010/affirmations',
  );

  export default call;