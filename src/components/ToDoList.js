import React, {Component} from 'react';

import './ToDoList.scss';
import TDHeader from './TD/TDHeader';
import TDElement from './TD/TDElement';
import TDPagination from './TD/TDPagination';

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
      if (this.props.newlyAddedTask !== "") {
        this.addTask();
      }
    }
  }

  addTask = () => {
    const task = {
      text: this.props.newlyAddedTask,
      isFinished: false
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

  toggleFinishTask = (index, boolean) => {
    const storedList = JSON.parse(localStorage.getItem("storedList"));
    storedList[index].isFinished = boolean;
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
            <TDHeader />
            {
              this.state.tdList.map((task,index) => {
                return (
                  <TDElement key={index} task={task} index={index} handleAtParentDelete={e => this.deleteTask(e)} handleAtParentIsFinished={(e,b) => this.toggleFinishTask(e,b)}/>
                )
              })
            }
            <TDPagination />
          </ul>
        </section>
      </>
    )
  }
}

export default ToDoList;