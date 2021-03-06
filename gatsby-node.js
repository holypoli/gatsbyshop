const path = require(`path`);
const slash = require(`slash`);
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(
    `
      {
        allContentfulProduct {
          edges {
            node {
              id
              slug
            }
          }
        }
        allContentfulCategory {
          edges {
            node {
              id
              slug              
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log("Error retrieving contentful data", result.errors);
    }
    // Resolve the paths to our template
    const productTemplate = path.resolve("./src/pages/components/productDetail.js");
    const categoryTemplate = path.resolve("./src/pages/components/categoryPage.js");
    // Then for each result we create a page.
    result.data.allContentfulProduct.edges.forEach(edge => {
      createPage({
        path: `/products/${edge.node.slug}/`,
        component: slash(productTemplate),
        context: {
          slug: edge.node.slug,
          id: edge.node.id
        }
      });
    });
    result.data.allContentfulCategory.edges.forEach(edge => {
      console.log(edge)
      createPage({
        path: `/products/${edge.node.slug}/`,
        component: slash(categoryTemplate),
        context: {
          slug: edge.node.slug,
          id: edge.node.id
        }
      });
    });
  })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
};
