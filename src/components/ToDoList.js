import React, {Component} from 'react';

import './ToDoList.scss';
import TDElement from './TD/TDElement';

class ToDoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tdList: [],
    }
  }

  componentDidMount() {
    const storedList = window.localStorage.getItem("storedList");
    const parsedStoredList = JSON.parse(storedList);
    
    if (storedList == null) {
      return false;
    } else {
      this.setState({
        tdList: parsedStoredList
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.newlyAddedTask !== prevProps.newlyAddedTask) {
      this.addTask();
    }
  }

  addTask = () => {
    const task = {
      text: this.props.newlyAddedTask
    };

    if (localStorage.getItem("storedList") == null) {
      const tdList = [];
      tdList.push(task);
      localStorage.setItem("storedList", JSON.stringify(tdList));
    } else {
      const tdList = JSON.parse(localStorage.getItem("storedList"));
      tdList.push(task);
      localStorage.setItem("storedList", JSON.stringify(tdList));
    }
    this.setState({
      tdList: JSON.parse(localStorage.getItem("storedList"))
    })
  }

  deleteTask = index => {
    const storedList = JSON.parse(localStorage.getItem("storedList"));
    storedList.splice(index,1);
    this.setState({
      tdList: storedList
    })
    localStorage.setItem("storedList", JSON.stringify(storedList));
  }

  render() {
    return (
      <>
        <section className={"row row__tdList"}>
          <ul className={"tdList"}>
            {
              this.state.tdList.map((task,index) => {
                return (
                  <TDElement key={index} task={task} index={index} handleAtParent={e => this.deleteTask(e)} />
                )
              })
            }
          </ul>
        </section>
      </>
    )
  }
}

export default ToDoList;