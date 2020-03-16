/* global tw */
import React from 'react'
import styled from '@emotion/styled'


export default class LeaderboardItem extends React.Component {
    render() {
        let value = this.props.value;
        return (
            <LeaderboardItem>
            <a target="_blank" rel="noopener noreferrer" href={"//twitter.com/"+value.node.twitter}>
                {value.node.twitter}
            </a>
            <h3>{value.count}</h3>
            <h3>{value.node.twitter}</h3>
            </LeaderboardItem>
        )

    }
}
