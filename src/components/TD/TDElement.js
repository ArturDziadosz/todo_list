import React, {Component} from 'react';

import './TDElement.scss';

class TDElement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.task.isFinished,
      priority: this.props.task.priority,
      deleteAreYouSure: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.task !== prevProps.task) {
      this.setState({
        checked: this.props.task.isFinished,
        priority: this.props.task.priority
      })
    }
  }

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

  handleChangeFinished = e => {
    const index = e.target.getAttribute("data-key");
    this.props.handleAtParentIsFinished(index, e.target.checked);

    this.setState({
      [e.target.name]: e.target.checked,
      deleteAreYouSure: false
    })
  }

  handleChangePriority = e => {
    const index = e.target.getAttribute("data-key");
    this.props.handleAtParentPriority(index, e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
      deleteAreYouSure:false
    })
  }

  render() {
    return (
      <>
        <li className={this.state.checked ? "tdList__element tdList__element--checked" : "tdList__element"} >
            <p className={"col-8"}>{this.props.task.text}</p>
            <select className={"col-2"} name={"priority"} data-key={this.props.index} onChange={e => this.handleChangePriority(e)} value={this.state.priority}>
              <option value={"Low"}>Low</option>
              <option value={"Medium"}>Medium</option>
              <option value={"High"}>High</option>
            </select>
            <input  type={"checkbox"} 
                    name={"checked"} 
                    onChange={e => this.handleChangeFinished(e)} 
                    data-key={this.props.index}
                    checked={this.state.checked}
                    className={"col-2"}
            />
            {this.state.deleteAreYouSure ? <p>Still not done, are you sure you want to delete it?</p> : null}
            <button type={"button"}
                    data-key={this.props.index}
                    onClick={e => this.deleteTask(e)}
                    className={"tdList__element__deleteBtn"}        
            >
                <i className="fas fa-trash-alt" data-key={this.props.index} />
            </button>
        </li>
      </>
    )
  }
}

export default TDElement;