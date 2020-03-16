require('dotenv').config({
  path: `./.env.${process.env.NODE_ENV}`,
})

const private_key = process.env.GATSBY_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

module.exports = {
  pathPrefix: `/images`,
  siteMetadata: {
    title: `Where To Work`,
    description: `Find spaces to work online`,
    author: `James W Lane`,
    siteUrl: `https://wheretowork.io`,
    image: `/images/og-image-2.png`,
    social: {
      twitter: `jameswlane`,
    },
    menuLinks: [
      {
        name: 'About',
        link: '/about',
      },
      {
        name: 'Blog',
        link: '/blog',
      },
      {
        name: 'Leaderboard',
        link: '/leaderboard',
      },
    ],
    cities: [
      {
        name: 'Belfast',
        link: '/',
      },
      {
        name: 'Dublin',
        link: '/dublin',
      },
      {
        name: 'London',
        link: '/london',
      },
      {
        name: 'Nottingham',
        link: '/nottingham',
      },
      {
        name: 'Edinburgh',
        link: '/edinburgh',
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-google-sheets',
      options: {
        spreadsheetId: `1ioNJhyUA1X-f0LmHwrqW5XjSo1j_gwtOmkZynkKaLZ8`,
        worksheetTitle: `Spaces`,
        credentials: {
          'type': 'service_account',
          'project_id': 'wheretowork-271216',
          'private_key_id': process.env.GATSBY_GOOGLE_PRIVATE_KEY_ID,
          'private_key': private_key,
          'client_email': 'wheretowork@wheretowork-271216.iam.gserviceaccount.com',
          'client_id': process.env.GATSBY_GOOGLE_CLIENT_ID,
          'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
          'token_uri': 'https://oauth2.googleapis.com/token',
          'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
          'client_x509_cert_url': 'https://www.googleapis.com/robot/v1/metadata/x509/wheretowork%40wheretowork-271216.iam.gserviceaccount.com',
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-mdx`,
    //   options: {
    //     extensions: ['.mdx', '.md'],
    //     gatsbyRemarkPlugins: [
    //       {
    //         resolve: `gatsby-remark-images`,
    //         options: {
    //           maxWidth: 1120,
    //           sizeByPixelDensity: true,
    //           withWebp: true,
    //           linkImagesToOriginal: false,
    //           showCaptions: true,
    //           wrapperStyle: {},
    //         },
    //       },
    //       {
    //         resolve: `gatsby-remark-responsive-iframe`,
    //         options: {
    //           wrapperStyle: `margin-bottom: 1.0725rem`,
    //         },
    //       },
    //       {
    //         resolve: `gatsby-remark-copy-linked-files`,
    //       },
    //
    //       {
    //         resolve: `gatsby-remark-smartypants`,
    //       },
    //     ],
    //   },
    // },
    `gatsby-transformer-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: 'UA-39366656-17',
    //     // Puts tracking script in the head instead of the body
    //     head: true,
    //     // Setting this parameter is optional
    //     anonymize: true,
    //     // Setting this parameter is also optional
    //     respectDNT: true,
    //     cookieDomain: 'tryingtowork.in',
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  data: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.code.boy }],
                })
              })
            },

            /* if you want to filter for only published posts, you can do
             * something like this:
             * filter: { frontmatter: { published: { ne: false } } }
             * just make sure to add a published frontmatter field to all posts,
             * otherwise gatsby will complain
             **/
            query: `
            {
              allMdx(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: 'Trying to work RSS feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Where to work`,
        short_name: `wtw`,
        start_url: `/`,
        background_color: `#1C1E2C`,
        theme_color: `#1C1E2C`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: ['Tiempos Headline', 'Fira Mono'],
        },
      },
    },
  ],
}
