const {request, 
  GraphQLClient} = require('graphql-request')
const nodeFetch  = require('node-fetch')

const queries = require('../queries/queries')

let ghToken = ''


exports.setToken = (token) => ghToken = token 

exports.getIssuesList = async function(res, n, CMSrepo, api = 'GRAPHQL', page = 1){
  if(api == 'GRAPHQL'){
    
    const query = queries.getLastNIssuesListing(n, CMSrepo)
    const data = await getDataGraphQL(res, query).catch((error) => console.error(error))
    res.send(data.repository.issues.nodes)

  }else if (api == 'REST'){
    const data = await getDataRest(res, `?page=${page}&per_page=${n}`)
    res.send(data)
  }
  
}

exports.getIssue = async function(res, issueN, CMSrepo){
  const query = queries.getIssueByNumber(issueN, CMSrepo)
  const data = await getDataGraphQL(res, query).catch((error) => console.error(error))
  
  res.send({
    id        : data.repository.issue.id,
    author    : data.repository.issue.author,
    bodyHTML  : data.repository.issue.bodyHTML,
    labels    : data.repository.issue.labels.nodes,
    comments  : data.repository.issue.comments.nodes
  })
  
  
}

exports.searchFor = async function(res, text, CMSrepo){
  const query = queries.searchFor(text, CMSrepo)
  const data = await getDataGraphQL(res, query).catch((error) => console.error(error))
  res.send(data)
  
}

exports.getArticlesByDate = (res, {day, month, year}, CMSrepo) => {
  
}


// 'https://api.github.com/repos/'+ repoSourceName +'/issues?'+ filter +'page='+page+'&per_page='+perPage

// GRAPHQL Request

async function getDataGraphQL(res, query) {
  const endpoint = 'https://api.github.com/graphql'

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `bearer ${ghToken}`,
    },
  })
  
  return await graphQLClient.request(query)

}

// REST Request


async function getDataRest(res, route){

  const headers = {
    'Authorization': `token ${ghToken}`,
    'User-Agent': 'github-cms-g'
  };
  
  const url = 'https://api.github.com/repos/DenoBrazil/deno-forum/issues' + route; 
  
  // console.log(ghToken)
  // request(options, callback);
  
  return fetch(url, {headers})
  .then((res) => res.json())
  // .then((json)=> res.send(json))
}
