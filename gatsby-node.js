const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
 const { createPage } = actions

 const result = await graphql(
   `
     {
        allMicrocmsArticles {
         edges {
           node {
             id
             title
             category {
                id
                name
             }
             body
             feature
           }
         }
       }
     }
   `
 )

 if (result.errors) {
   throw result.errors
 }

 result.data.allMicrocmsArticles.edges.forEach(edge => {
     //上記のGraphQLでcategoryを書いてないがnode.categoryを掴めるようだ
     const categoryName = edge.node.category[0].name
     switch (categoryName) {
         case 'studies':  // categoryがstudiesだったらサブパスをstudiesに
             subDir = '/studies/'+ edge.node.id
             break;
         case 'life':  // categoryがlifeだったらサブパスをlifeに
             subDir = '/life/'+edge.node.id
             break;
         case 'hobbies':  // categoryがhobbiesだったらサブパスをhobbiesに
             subDir = '/hobbies/'+edge.node.id
         default:
             subDir = '/articles/'+edge.node.id
     }
   createPage({
     //path: `/patients/${edge.node.id}`,
     path: `${subDir}`,
     component: path.resolve(
       "./src/templates/article.js"
     ),
     context: {
       id: edge.node.id,
     },
   })

 })
}