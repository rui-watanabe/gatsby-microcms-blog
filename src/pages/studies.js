import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const StudiesPage = ({ data }) => (
  <Layout>
    <SEO title="勉強のアウトプット" />

    {data.allMicrocmsArticles.edges.map((edge) => {
      const articles = edge.node;
      const category = edge.node.category[0].name;
      console.log("◆categoryは　" + category);

      if (category == "studies") {
        //カテゴリーが勉強用の場合表示
        return (
          <React.Fragment key={articles.id}>
            <div>
              <Link to={`/studies/${articles.id}`}>
                  <h1>{articles.title}</h1>
              </Link>
              <p>{articles.feature}</p>
              {(articles.picture) != null ?
                <img
                  src={articles.picture.url}
                  width={110}
                  height={110}
                  alt="picture画像"
                />
                :
                <></>
              }
            </div>
            <div>
              {articles.category.map((category) => (
                <React.Fragment key={category.id}>
                  <span>カテゴリー：{category.name}</span>
                </React.Fragment>
              ))}
            </div>
            <hr />
          </React.Fragment>
        );
      } else {
        return;
      }
    })}
  </Layout>
);

export const query = graphql`
  {
    allMicrocmsArticles(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          title
          category {
            id
            name
          }
          picture {
            url
          }
          body
          feature
        }
      }
    }
  }
`;

export default StudiesPage;
