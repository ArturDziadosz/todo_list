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
      filter: {
        azFilter: false,
        zaFilter: false,
        ascentPriority: false,
        descentPriority: false
      }
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
    if (this.props.newlyAddedTask.inputValue !== prevProps.newlyAddedTask.inputValue) {
      if (this.props.newlyAddedTask.inputValue !== "") {
        this.addTask();
      }
    }
  }

  addTask = () => {
    this.setState({
      filter: {
        azFilter: false,
        zaFilter: false,
        ascentPriority: false,
        descentPriority: false
      }
    })

    const task = {
      text: this.props.newlyAddedTask.inputValue,
      priority: this.props.newlyAddedTask.priority,
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

  changePriority = (index, priority) => {
    const storedList = JSON.parse(localStorage.getItem("storedList"));
    storedList[index].priority = priority;
    this.setState({
      tdList: storedList
    })
    localStorage.setItem("storedList", JSON.stringify(storedList));
  }

  sort = filter => {
    switch (filter) {
      case "az":
        this.setState({
          filter: {
            azFilter: true,
            zaFilter: false,
            ascentPriority: false,
            descentPriority: false
          }
        });
      break;
      case "za":
        this.setState({
          filter: {
            azFilter: false,
            zaFilter: true,
            ascentPriority: false,
            descentPriority: false
          }
        });
      break;
      case "ascent":
        this.setState({
          filter: {
            azFilter: false,
            zaFilter: false,
            ascentPriority: true,
            descentPriority: false
          }
        });
      break;
      case "descent":
        this.setState({
          filter: {
            azFilter: false,
            zaFilter: false,
            ascentPriority: false,
            descentPriority: true
          }
        });
      break;
      default:
        this.setState({
          filter: {
            azFilter: false,
            zaFilter: false,
            ascentPriority: false,
            descentPriority: false
          }
        });
    }    
  }

  render() {

    if (this.state.filter.azFilter) {
      this.state.tdList.sort((a, b) => {
        const nameA = a.text;
        const nameB = b.text;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      localStorage.setItem("storedList", JSON.stringify(this.state.tdList));
    }

    if (this.state.filter.zaFilter) {
      this.state.tdList.sort((a, b) => {
        const nameA = a.text;
        const nameB = b.text;
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
      localStorage.setItem("storedList", JSON.stringify(this.state.tdList));
    }

    if (this.state.filter.ascentPriority) {
      const priorities = {
        "High": 0,
        "Medium": 1,
        "Low": 2
      };

      this.state.tdList.sort((a, b) => {
        const priorityA = priorities[a.priority];
        const priorityB = priorities[b.priority];
        if (priorityA > priorityB) {
          return -1;
        }
        if (priorityA < priorityB) {
          return 1;
        }
        return 0;
      });
      localStorage.setItem("storedList", JSON.stringify(this.state.tdList));
    }

    if (this.state.filter.descentPriority) {
      const priorities = {
        "High": 0,
        "Medium": 1,
        "Low": 2
      };

      this.state.tdList.sort((a, b) => {
        const priorityA = priorities[a.priority];
        const priorityB = priorities[b.priority];
        if (priorityA < priorityB) {
          return -1;
        }
        if (priorityA > priorityB) {
          return 1;
        }
        return 0;
      });
      localStorage.setItem("storedList", JSON.stringify(this.state.tdList));
    }

    return (
      <>
        <section className={"row row__tdList"}>
          <ul className={"tdList"}>
            <TDHeader handleAtParentSort={this.sort} activeFilter={this.state.filter}/>
            {
              this.state.tdList.map((task,index) => {
                return (
                  <TDElement  key={index} 
                              task={task} 
                              index={index} 
                              handleAtParentDelete={index => this.deleteTask(index)} 
                              handleAtParentIsFinished={(index, boolean) => this.toggleFinishTask(index, boolean)} 
                              handleAtParentPriority={(index, priority) => this.changePriority(index, priority)}
                  />
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