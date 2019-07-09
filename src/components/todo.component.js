import React, { Component } from 'react'

export default class todo extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.todo.description}</h2>
                <h2>{this.props.todo.responsible}</h2>
                <h2>{this.props.todo.priority}</h2>
            </div>
        )
    }
}
