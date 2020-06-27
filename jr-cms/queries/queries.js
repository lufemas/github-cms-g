exports.getLastNIssuesListing = (n, {name, owner})=>{
   return` 
    {
      repository(name: ${JSON.stringify(name)}, owner: ${JSON.stringify(owner)}) {
        issues(last: ${n}) {
          nodes {
            number
            id
            createdAt
            author {
              login
              url
            }
            title
            labels(last:5){
              nodes{
                name,
                id
              }
            }
          }
        }
      }
    }`
  }

exports.getIssueByNumber = (n, {name, owner})=>{
  return `
  {
    repository(name: ${JSON.stringify(name)}, owner: ${JSON.stringify(owner)}) {
      issue(number: ${n}) {
        id,
        createdAt,
        author{
          login
          url
        }
        bodyHTML,
        labels(last: 10){
       	 nodes{
          name,
          color
     	   }
     		},
        comments(last: 10) {
          nodes {
            author{
              login,
              url
            } 
            createdAt,
            bodyHTML
          }
        }  
      }
    }
  }
  `
}

exports.searchFor = (text, {name, owner}) =>{
  return `
  {
    search(query: "repo:${owner}/${name}  ${text}", type: ISSUE, first: 100) {
      nodes {
        ... on Issue {
          number
          title
          bodyHTML
        }
      }
    }
  }
  `
}


// getLastnIssuesListing = (n)=>{
//   return` 
//    {
//      repository(name: "deno-forum", owner: "DenoBrazil") {
//        issues(last: ${n}) {
//          nodes {
//            number
//            id
//            createdAt
//            author {
//              login
//              url
//            }
//            title
//            bodyHTML
//          }
//        }
//      }
//    }`
//  },

// USE STARTCURSOR ON BEFORE TO GET THE LAST ONES

// {
//   viewer {
//     login
//   }
//   repository(name: "deno-forum", owner: "DenoBrazil") {
//     id
//     issues(last: 2 before:"Y3Vyc29yOnYyOpHOJcpPsw==") {
//       edges {
//         node {
//           id
//           title
//           createdAt
//           bodyHTML
//           labels(last: 10) {
//             edges {
//               node {
//                 name
//                 url
//               }
//             }
//           }
//         }
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//         hasPreviousPage
//         startCursor
//       }
//     }
//   }
// }

