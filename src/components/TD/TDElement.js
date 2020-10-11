import React, {Component} from 'react';

import './TDElement.scss';

import {Button} from '@material-ui/core';

class TDElement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.task.isFinished,
      priority: this.props.task.priority,
      deleteAreYouSure: false
    }
  }

  // updating state after getting new task or changed task
  componentDidUpdate(prevProps) {
    if (this.props.task !== prevProps.task) {
      this.setState({
        checked: this.props.task.isFinished,
        priority: this.props.task.priority
      })
    }
  }

  // passing index of element to parent to delete task, with validation if it's finished
  deleteTask = e => {
    if (this.state.checked === false) {
      if (this.state.deleteAreYouSure === true) {
        const index = e.target.getAttribute("data-key");
        this.props.handleAtParentDelete(index);
      }
      this.setState({
        deleteAreYouSure: true
      })
    } else {    
    const index = e.target.getAttribute("data-key");
    this.props.handleAtParentDelete(index);
    }
  }

  // handler for changing the finished status (true, false)
  handleChangeFinished = e => {
    const index = e.target.getAttribute("data-key");
    this.props.handleAtParentIsFinished(index, e.target.checked);

    this.setState({
      [e.target.name]: e.target.checked,
      deleteAreYouSure: false
    })
  }

  // handler for changing priority
  handleChangePriority = e => {
    const index = e.target.getAttribute("data-key");
    this.props.handleAtParentPriority(index, e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
      deleteAreYouSure:false
    })
  }

  render() {
    const {priority, checked, deleteAreYouSure} = this.state;

    return (
      <>
        <li className={checked ? "tdList__element tdList__element--checked" : "tdList__element"} >
            <p className={"col-8 element__text"}>{this.props.task.text}</p>
            <select className={"col-2 element__priority"} name={"priority"} data-key={this.props.index} onChange={e => this.handleChangePriority(e)} value={priority}>
              <option value={"Low"}>Low</option>
              <option value={"Medium"}>Medium</option>
              <option value={"High"}>High</option>
            </select>
            <div className={"col-2 element__done"}>
              <input  type={"checkbox"} 
                      name={"checked"} 
                      onChange={e => this.handleChangeFinished(e)} 
                      data-key={this.props.index}
                      checked={checked}
                      className={"element__done__btn"}
                      value={checked}
              />
            </div>
            {deleteAreYouSure ? <p className={"tdList__element__warning col-10"}>Still not done, are you sure you want to delete it?</p> : null}
            <Button type={"button"}
                    data-key={this.props.index}
                    onClick={e => this.deleteTask(e)}
                    className={"element__btn element__btn--delete"}     
            >
                <i className="fas fa-trash-alt" data-key={this.props.index} />
            </Button>
        </li>
      </>
    )
  }
}

export default TDElement;