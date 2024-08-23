const Post =  async (url, params) => {
    const SignUpJson = await fetch(url, {
        method: 'Post', 
        headers: { 
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
        },
        body : JSON.stringify(params),
    })
    // .then(response => console.log(response.json))
    .then(response => {
        return response.text()
    })
    .catch(err => {
        alert(err)
    });
    
    return SignUpJson
}

export {Post};

//ChatGPT답변
// const post = async (url, params) => {
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(params),
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }
  
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error during POST request:', error);
//       alert('서버와의 통신 중 문제가 발생했습니다.');
//       return null;
//     }
//   };

// const get =  async (url) => {
//     const SignUpJson = await fetch(url, {
//         method: 'get', 
//         // headers: { 
//         //     "Access-Control-Allow-Headers" : "Content-Type",
//         //     "Access-Control-Allow-Origin": "*",
//         // },
//     })
//     // .then(response => console.log(response.json))
//     .then(response => {
//         return response
//     })
//     .then((json) => {         
//         return json        
//     })
//     .catch(err => {
//         alert(err)
//     });
    
//     return SignUpJson
// }

// export {post, get};
