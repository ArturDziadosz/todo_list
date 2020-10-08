import React, {Component} from 'react';

import './ToDoList.scss';

class ToDoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tdList: []
    }
  }

  render() {
    return (
      <>
        <section className={"row row__tdList"}>
          <div>
            TDList
          </div>
        </section>
      </>
    )
  }
}

export default ToDoList;