import React, { Component } from 'react'

export class Info extends Component {
    render() {
        return (
            <div>
                this is info page
                {this.props.match.params.mainId}
            </div>
        )
    }
}

export default Info
