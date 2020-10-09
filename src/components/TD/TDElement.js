import React, {Component} from 'react';

import './TDElement.scss';

class TDElement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.task.isFinished,
      priority: this.props.task.priority
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.task !== prevProps.task) {
      this.setState({
        checked: this.props.task.isFinished
      })
    }
  }

  deleteTask = e => {
    if (this.state.checked === false) {
      return false;
    } else {
    const index = e.target.getAttribute("data-key");
    this.props.handleAtParentDelete(index);
    }
  }

  handleChangeFinished = e => {
    const index = e.target.getAttribute("data-key");
    this.props.handleAtParentIsFinished(index, e.target.checked);

    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  handleChangePriority = e => {
    const index = e.target.getAttribute("data-key");
    this.props.handleAtParentPriority(index, e.target.value);

    this.setState({
      [e.target.name]: e.target.value
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