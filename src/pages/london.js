import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Spaces from '../components/spaces';
import PageTitle from '../components/pageTitle';


export default class Dulinb extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			selectedValue: "London",
		};
	}

	// onCalculateDistance = (dist) => {
	// 		// this.setState({
	// 		// 	distance: dist
	// 		// })
	// 		// console.log(dist)
	// 		return dist;
	// }


  render() {

    return (
      <Layout>
			<SEO title={"Spaces to work in "+this.state.selectedValue} metaTitle={"Spaces to work online in "+this.state.selectedValue+" | Where to work"} description={"Find spaces to work online in " +this.state.selectedValue+ ". For freelancers, remote workers and digital nomads."} />

			<PageTitle title="Where to work" description={"Find spaces to work online in "+this.state.selectedValue}  />

			<Spaces data={this.props.data.allGoogleSheetSpacesRow} />
      </Layout>
    )
  }
}

export const query = graphql`
	query London {
		allGoogleSheetSpacesRow(filter: { city: {eq: "London" }}) {
			edges {
				node {
					id
					space
					city
					location
					type
					speed
					password
					sockets
					timestamp
					latitude
					longitude
					website
					mapsurl
					twitter
					rating
					monday
					tuesday
					wednesday
					thursday
					friday
					saturday
					sunday
				}
			}
		}
	}
`
