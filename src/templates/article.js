import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const ArticlePost = props => {
 const post = props.data.microcmsArticles // allMicrocmsArticleでない
 return (
   <Layout>
     <div>
       <h1>{post.title}</h1>
       <br />
       {console.log(post)}
       {(post.picture.url) ?
         <img
            src={post.picture.url}
            width={160}
            height={110}
            alt="picture画像"
         />
         :
         <></>
       }
       <p
         dangerouslySetInnerHTML={{
           __html: `${post.body}`,
         }}
       ></p>
     </div>
   </Layout>
 )
}

export default ArticlePost

export const query = graphql`
 query($id: String!) {
   microcmsArticles(id: { eq: $id }) {
     title
     body
     picture {
      url
     }
   }
 }
`