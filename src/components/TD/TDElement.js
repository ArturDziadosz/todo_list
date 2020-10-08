import React, {Component} from 'react';

import './TDElement.scss';

class TDElement extends Component {

  deleteTask = e => {
    const index = e.target.getAttribute("data-key");
    this.props.handleAtParent(index);
  }

  render() {
    return (
      <>
        <li>
            {this.props.task.text}
            <button type={"button"}
                    data-key={this.props.index}
                    onClick={e => this.deleteTask(e)}        
            >
                Delete
            </button>
        </li>
      </>
    )
  }
}

export default TDElement;