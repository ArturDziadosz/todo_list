import React, {Component} from 'react';

import './TDElement.scss';

class TDElement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.task.isFinished
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

  handleChange = e => {
    const index = e.target.getAttribute("data-key");
    this.props.handleAtParentIsFinished(index, e.target.checked);

    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  render() {
    return (
      <>
        <li className={this.state.checked ? "tdList__element tdList__element--checked" : "tdList__element"} >
            <p className={"col-8"}>{this.props.task.text}</p>
            <input  type={"checkbox"} 
                    name={"checked"} 
                    onClick={e => this.handleChange(e)} 
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