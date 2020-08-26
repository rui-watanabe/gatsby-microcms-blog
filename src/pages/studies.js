import React from "react";
import { graphql } from "gatsby";

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
        //カテゴリーが患者さん用の場合表示
        return (
          <React.Fragment key={articles.id}>
            <div>
              <h2>{articles.title}</h2>
              {/* <p>{articles.feature}</p> */}
              {/* <img
                src={articles.pict.url}
                width={110}
                height={110}
                alt="pict画像"
              /> */}
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
          body
        }
      }
    }
  }
`;

export default StudiesPage;
