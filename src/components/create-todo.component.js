import React, { Component } from 'react'
import Axios from 'axios'
import { MdSave } from 'react-icons/md';
import { connect } from 'react-redux'

class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            description: '',
            responsible: '',
            priority: '',
            completed: false
        }
    }

    componentWillMount (){
        if(!sessionStorage.getItem('login')) {
            this.props.history.push('/')
          }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            description: this.state.description,
            responsible: this.state.responsible,
            priority: this.state.priority,
            completed: this.state.completed
        }

        this.props.dispatch({ //ส่งข้อมูลไป store
            type: 'ADD_TODO',
            newTodo
        });

        Axios.post('http://localhost:3030/api/todos/', newTodo)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err)
            });
        
        this.setState({
            description: '',
            responsible: '',
            priority: '',
            completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop:10, minWidth: 300,maxWidth: 500, height: 30 + '%', marginLeft: 'auto', marginRight: 'auto'}} className="container">
                <h2>Create New Todo</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" className="form-control" 
                                name="description"
                                value={this.state.description} 
                                onChange={this.handleChange} 
                            />
                    </div>

                    <div className="form-group">
                        <label>Responsible:</label>
                        <input type="text" className="form-control"
                                name="responsible" 
                                value={this.state.responsible} 
                                onChange={this.handleChange} 
                            />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="priority" 
                                id="priorityLow" 
                                value="Low" 
                                checked={this.state.priority==='Low'}
                                onChange={this.handleChange}
                                />
                            <label className="form-check-lable">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="priority" 
                                id="priorityMedium color-1" 
                                value="Medium" 
                                checked={this.state.priority==='Medium'}
                                onChange={this.handleChange}
                                />
                            <label className="form-check-lable">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="priority" 
                                id="priorityHigh" 
                                value="High" 
                                checked={this.state.priority==='High'}
                                onChange={this.handleChange}
                                />
                            <label className="form-check-lable">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary"><MdSave /></button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(CreateTodo);
