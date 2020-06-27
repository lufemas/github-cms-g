'use strict'

// import { getIssues } from "../queries/queries.js";

const API_URL = 'http://localhost:3000'

const $ = (e)=> document.querySelector(e)

$('#try-btn').onclick = (e)=>{
  console.info('Clicked')

  $('#text-output').innerHTML = ''
  fetch(API_URL + "/issueslist")
        .then(response => response.json())
        .then(issuesList => {
            console.log(issuesList);
            
            issuesList.forEach( issue => {
              const $li = document.createElement('li')
              const $button = document.createElement('button')
              $button.className = "jr button m-05"
              $button.onclick = () => renderArticle(issue.number)
              $button.innerHTML = `<b> - ${issue.title} </b>`
              $li.appendChild($button)
              $('#text-output').appendChild($li)
            })
        });


}

$('#search-btn').onclick = (e)=>{
  console.info('Clicked')
  $('#text-output').innerHTML = ''
  const searchText = $('#search-text').value
  fetch(API_URL + `/issueslist/search/${searchText}`)
        .then(response => response.json())
        .then(issuesList => {
            console.log(issuesList);

            if(issuesList.search.nodes.length > 0){
              
              issuesList.search.nodes.forEach( issue => {
                const $li = document.createElement('li')
                const $button = document.createElement('button')
                $button.className = "jr button m-05"
                $button.onclick = () => renderArticle(issue.number)
                $button.innerHTML = `<b> - ${issue.title} </b>`
                $li.appendChild($button)
                $('#text-output').appendChild($li)
              })
            }else{
              $('#text-output').innerText = "Nothing found..."
              console.log("nothing found")
            }

        });


}



const renderArticle = (n)=>{

  
    console.info('renderAticle')
  
    fetch(API_URL + "/issueslist/" + n)
          .then(response => response.json())
          .then(issue => {
              // const issue = data.repository.issue
              console.log(issue);
              $('#article-body').innerHTML = issue.bodyHTML

              const $ul = document.createElement('ul')

              issue.comments.forEach( comment =>{

                const $commentLi = document.createElement('li')
                $commentLi.className = "jr"
                $commentLi.innerHTML += ` <hr> <p><a href=${comment.author.url}>${comment.author.login}</a></p>`
                $commentLi.innerHTML += comment.bodyHTML
                $ul.appendChild($commentLi)

              })

              $('#article-body').appendChild($ul)
          });

  

}

// fetch('https://api.github.com/graphql', {
//   method: 'POST',
//   headers: {
//     'Authorization': "bearer ...",
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query: getIssues(10)
//   })
// })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));


// fetch('/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({query: "{ hello }"})
// })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));