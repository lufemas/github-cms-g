const {request, 
  GraphQLClient} = require('graphql-request')
const nodeFetch  = require('node-fetch')

const ghAPIHAndler = require('./model/ghAPIHandler')

global.fetch = require('fetch-cookie')(nodeFetch)

const CMSrepo = {
  name: "deno-forum",
  owner: "DenoBrazil"
}

let ghToken = ''

   /**
     Set the target github repository

     EXAMPLE:

   *  https://github.com/OWNER/NAME/
   *
   *
   *    const jrCMS = require('./jr-cms/jr-cms')
   * 
   *    jrCMS.setRepo({
   *     name: "NAME",
   *     owner: "OWNER"
   *     })
     */
module.exports.setRepo = ({name, owner})=>{
  CMSrepo.name = name;
  CMSrepo.owner = owner;
}

   /**
    Provide your GitHub Token.
    https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line
     */
module.exports.setToken = (token)=>{
  ghToken = token
  ghAPIHAndler.setToken(token)
} 

module.exports.init = (app, baseRoute = '/issueslist') =>{
  app.get('/', (req,res)=>{
    res.send('API running')
  })
  app.get(baseRoute, (req,res)=>{

    // ghAPIHAndler.getIssuesList(res, 10, CMSrepo)
    ghAPIHAndler.getIssuesList(res, 3, CMSrepo, 'REST', 1)
      
  })


  app.get(baseRoute +'/:number', (req,res)=>{

    ghAPIHAndler.getIssue(res, req.params.number, CMSrepo )

    // async function getData() {
    //   const endpoint = 'https://api.github.com/graphql'
    
    //   const graphQLClient = new GraphQLClient(endpoint, {
    //     headers: {
    //       authorization: `bearer ${ghToken}`,
    //     },
    //   })

    //   const query  = ghAPIHAndler.getIssue(req.params.number, CMSrepo)
      
    //   const data = await graphQLClient.request(query)
    //   // console.log(JSON.stringify(data, undefined, 2))
    //   res.send(data)
    //   // console.log(data)
    // }
    
    // getData().catch((error) => console.error(error))


  })

  app.get(baseRoute +'/search/:text', (req,res)=>{

    ghAPIHAndler.searchFor(res, req.params.text, CMSrepo)
    

  })



}



////////////////////////////////////////////////////////////////////////
//// GitHub Rest API
////////////////////////////////////////////////////////////////////////

exports.RestAPI = ()=>{

  const headers = {
      'Authorization': `token ${ghToken}`,
      'User-Agent': 'github-cms-g'
  };
  
  const url = 'https://api.github.com/repos/DenoBrazil/deno-forum/issues'; 
  
  // request(options, callback);
  
  fetch(url, {headers})
  .then((res) => res.json())
  .then((json)=>{
    // console.log(json)
  })

}  


