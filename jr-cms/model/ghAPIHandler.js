const {request, 
  GraphQLClient} = require('graphql-request')
const nodeFetch  = require('node-fetch')

const queries = require('../queries/queries')

let ghToken = ''

async function getDataGraphQL(res, query) {
  const endpoint = 'https://api.github.com/graphql'

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `bearer ${ghToken}`,
    },
  })

  // const query  = ghAPIHAndler.getIssue(req.params.number, CMSrepo)
  
  return await graphQLClient.request(query)
  // console.log(JSON.stringify(data, undefined, 2))
  // res.send(data)
  // console.log(data)
}

exports.setToken = (token) => ghToken = token 

exports.getIssuesList = async function(res, n, CMSrepo){
  const query = queries.getLastNIssuesListing(n, CMSrepo)
  const data = await getDataGraphQL(res, query).catch((error) => console.error(error))
  res.send(data)

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