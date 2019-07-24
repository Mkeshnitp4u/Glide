class HttpUtils{ 
    getAPICallWithoutHeader=(url , onSuccess , onFailure)=>{
        fetch(url, { 
            method: 'GET',
       })
       .then((response) => response.json())
       .then((responseJson) => {
          if(responseJson.hasOwnProperty("results")){
            onSuccess(responseJson.results)
           }else{
            onFailure(error)
           }
       })
    .catch((error) => {
        onFailure(error)
       });
}

getAPICallWithHeader=(url , onSuccess , onFailure )=>{
    fetch(url, { 
        method: 'GET',
        headers: {
          'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGMxNmQ1NmYyNjQ3ZTYxYzJmYWVmNTM1NTAxNDk2OSIsInN1YiI6IjVkMzJlY2E0Y2FhYjZkMGIyOWE2NTkwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-w1-kqr_jJ2oybG5GaVWIWUBRVj-w2KcuC2RZuJJTs",
          'Content-Type': 'application/json'
      }
   })
   .then((response) => response.json())
   .then((responseJson) => {
      if(responseJson.hasOwnProperty("results")){
        onSuccess(responseJson.results)
      }else{
        onFailure(error)  
      }
   }).catch((error)=>{
    onFailure(error)
   })
}

}
let HttpUtill = new HttpUtils()
export default HttpUtill