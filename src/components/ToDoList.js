import React, {Component} from 'react';

import './ToDoList.scss';
import TDHeader from './TD/TDHeader';
import TDElement from './TD/TDElement';
import TDPagination from './TD/TDPagination';

import {v4 as uuidv4} from "uuid";

class ToDoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tdList: [],
      filter: {
        azFilter: false,
        zaFilter: false,
        ascentPriority: false,
        descentPriority: false,
        checked: false,
        notChecked: false
      },
      viewedTDList: []
    }
    this.paginationRef = React.createRef();
  }

  // loading stored list on loading app
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

  // when new props comes in with new task invoking addTask function, with validation of input value
  componentDidUpdate(prevProps) {
    if (this.props.newlyAddedTask.inputValue !== prevProps.newlyAddedTask.inputValue) {
      if (this.props.newlyAddedTask.inputValue !== "") {
        this.addTask();
      }
    }
  }

  // adding new task to list in component state and local storage
  addTask = () => {
    // disabling the sorting to add new task on top of the list
    this.setState({
      filter: {
        azFilter: false,
        zaFilter: false,
        ascentPriority: false,
        descentPriority: false,
        checked: false,
        notChecked: false
      }
    })

    // new task has text, priority and it's not finished by default 
    const task = {
      id: uuidv4(),
      text: this.props.newlyAddedTask.inputValue,
      priority: this.props.newlyAddedTask.priority,
      isFinished: false
    };

    // checking if local storage has some data, adding new task and store it in local storage
    if (localStorage.getItem("storedList") == null) {
      const storedList = [];
      storedList.push(task);
      localStorage.setItem("storedList", JSON.stringify(storedList));
    } else {
      const storedList = JSON.parse(localStorage.getItem("storedList"));
      storedList.unshift(task);
      localStorage.setItem("storedList", JSON.stringify(storedList));
    }

    // updating state with updated local storage
    this.setState({
      tdList: JSON.parse(localStorage.getItem("storedList"))
    })
  }

  // deleting task with splice method and updating state and local storage
  deleteTask = id => {
    const storedList = JSON.parse(localStorage.getItem("storedList"));
    const index = storedList.findIndex(task => task.id === id);
    storedList.splice(index,1);
    this.setState({
      tdList: storedList
    })
    localStorage.setItem("storedList", JSON.stringify(storedList));
  }

  // toggling the checkbox status with updating state and local storage
  toggleFinishTask = (id, boolean) => {
    const storedList = JSON.parse(localStorage.getItem("storedList"));
    const index = storedList.findIndex(task => task.id === id);
    storedList[index].isFinished = boolean;
    this.setState({
      tdList: storedList
    })
    localStorage.setItem("storedList", JSON.stringify(storedList));
  }

  // changing the priority of task with updating state and local storage
  changePriority = (id, priority) => {
    const storedList = JSON.parse(localStorage.getItem("storedList"))
    const index = storedList.findIndex(task => task.id === id);
    storedList[index].priority = priority;
    this.setState({
      tdList: storedList
    })
    localStorage.setItem("storedList", JSON.stringify(storedList));
  }

  // changing the active filter
  sort = filter => {
    
    // data needed to show sorted list depending on the pagination that it's in use
    const indexOfLast = this.paginationRef.current.state.currentPage * this.paginationRef.current.state.tasksPerPage;
    const indexOfFirst = indexOfLast - this.paginationRef.current.state.tasksPerPage;

    // switch for maintaining the code easier
    switch (filter) {
      case "az":
        this.setState({
          filter: {
            azFilter: true,
            zaFilter: false,
            ascentPriority: false,
            descentPriority: false,
            checked: false,
            notChecked: false
          }
        }, () => {
          // after updating state with new filter invoke changeView function to show list according to pagination
          this.changeView(this.state.tdList.slice(indexOfFirst, indexOfLast));
        });
      break;
      case "za":
        this.setState({
          filter: {
            azFilter: false,
            zaFilter: true,
            ascentPriority: false,
            descentPriority: false,
            checked: false,
            notChecked: false
          }
        }, () => {
          this.changeView(this.state.tdList.slice(indexOfFirst, indexOfLast));
        });
      break;
      case "ascent":
        this.setState({
          filter: {
            azFilter: false,
            zaFilter: false,
            ascentPriority: true,
            descentPriority: false,
            checked: false,
            notChecked: false
          }
        }, () => {
          this.changeView(this.state.tdList.slice(indexOfFirst, indexOfLast));
        });
      break;
      case "descent":
        this.setState({
          filter: {
            azFilter: false,
            zaFilter: false,
            ascentPriority: false,
            descentPriority: true,
            checked: false,
            notChecked: false
          }
        }, () => {
          this.changeView(this.state.tdList.slice(indexOfFirst, indexOfLast));
        });
      break;
      case "checked":
        this.setState({
          filter: {
            azFilter: false,
            zaFilter: false,
            ascentPriority: false,
            descentPriority: false,
            checked: true,
            notChecked: false
          }
        }, () => {
          this.changeView(this.state.tdList.slice(indexOfFirst, indexOfLast));
        });
      break;
      case "notChecked":
        this.setState({
          filter: {
            azFilter: false,
            zaFilter: false,
            ascentPriority: false,
            descentPriority: false,
            checked: false,
            notChecked: true
          }
        }, () => {
          this.changeView(this.state.tdList.slice(indexOfFirst, indexOfLast));
        });
      break;
      default:
        this.setState({
          filter: {
            azFilter: false,
            zaFilter: false,
            ascentPriority: false,
            descentPriority: false,
            checked: false,
            notChecked: false
          }
        }, () => {
          this.changeView(this.state.tdList.slice(indexOfFirst, indexOfLast));
        });
    }
  }

  // changing the view depending on current pagination
  changeView = viewedTasks => {
    this.setState({
      viewedTDList: viewedTasks
    })
  }

  render() {
    const {tdList, filter, viewedTDList} = this.state;

    // sorting the task list depending on the active filter and updating the local storage
    if (filter.azFilter) {
      tdList.sort((a, b) => {
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
      localStorage.setItem("storedList", JSON.stringify(tdList));
    }

    if (filter.zaFilter) {
      tdList.sort((a, b) => {
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
      localStorage.setItem("storedList", JSON.stringify(tdList));
    }

    if (filter.ascentPriority) {
      const priorities = {
        "High": 0,
        "Medium": 1,
        "Low": 2
      };

      tdList.sort((a, b) => {
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
      localStorage.setItem("storedList", JSON.stringify(tdList));
    }

    if (filter.descentPriority) {
      const priorities = {
        "High": 0,
        "Medium": 1,
        "Low": 2
      };

      tdList.sort((a, b) => {
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
      localStorage.setItem("storedList", JSON.stringify(tdList));
    }

    if (filter.checked) {
      const priorities = {
        true: 0,
        false: 1
      };

      tdList.sort((a, b) => {
        const priorityA = priorities[a.isFinished];
        const priorityB = priorities[b.isFinished];
        if (priorityA < priorityB) {
          return -1;
        }
        if (priorityA > priorityB) {
          return 1;
        }
        return 0;
      });
      localStorage.setItem("storedList", JSON.stringify(tdList));
    }

    if (filter.notChecked) {
      const priorities = {
        true: 0,
        false: 1
      };

      tdList.sort((a, b) => {
        const priorityA = priorities[a.isFinished];
        const priorityB = priorities[b.isFinished];
        if (priorityA > priorityB) {
          return -1;
        }
        if (priorityA < priorityB) {
          return 1;
        }
        return 0;
      });
      localStorage.setItem("storedList", JSON.stringify(tdList));
    }

    return (
      <>
        <section className={"row row__tdList"}>
          <ul className={"tdList"}>
            <TDHeader handleAtParentSort={this.sort} activeFilter={filter}/>
            {
              viewedTDList.map((task,index) => {
                return (
                  <TDElement  key={task.id} 
                              task={task} 
                              index={index} 
                              handleAtParentDelete={id => this.deleteTask(id)} 
                              handleAtParentIsFinished={(id, boolean) => this.toggleFinishTask(id, boolean)} 
                              handleAtParentPriority={(id, priority) => this.changePriority(id, priority)}
                  />
                )
              })
            }
            <TDPagination tdList={tdList} handleAtParent={viewedTasks => this.changeView(viewedTasks)} ref={this.paginationRef}/>
          </ul>
        </section>
      </>
    )
  }
}

export default ToDoList;