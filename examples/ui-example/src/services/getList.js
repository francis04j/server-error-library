
export function getList() {
    return fetch('http://localhost:4010/affirmations')
      .then(data => data.json())
  }