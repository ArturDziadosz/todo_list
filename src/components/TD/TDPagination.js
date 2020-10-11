import React, {Component} from 'react';

import './TDPagination.scss';

import {Button} from "@material-ui/core";

class TDPagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      tasksPerPage: 5,
      tdList: this.props.tdList
    }
  }

  // updating state with new list to add current pagination and pass data to parent element
  componentDidUpdate(prevProps) {
    if (this.props.tdList !== prevProps.tdList) {
      this.setState({
        tdList: this.props.tdList
      }, () => {
        const indexOfLast = this.state.currentPage * this.state.tasksPerPage;
        const indexOfFirst = indexOfLast - this.state.tasksPerPage;
        const viewedTasks = this.state.tdList.slice(indexOfFirst, indexOfLast);   
        this.props.handleAtParent(viewedTasks);
      })
    }
  }

  // go to previous page, with validation to not to go to page below first and passing data to parent element
  handlePageDown = () => {
    if (this.state.currentPage > "1") {
      this.setState(prevState => ({
        currentPage: prevState.currentPage -1
      }), () => {
        const indexOfLast = this.state.currentPage * this.state.tasksPerPage;
        const indexOfFirst = indexOfLast - this.state.tasksPerPage;
        const viewedTasks = this.state.tdList.slice(indexOfFirst, indexOfLast);   
        this.props.handleAtParent(viewedTasks);
      })
    }
  }

  // go to next page, with validation to not to go to page beyond last and passing data to parent element
  handlePageUp = () => {
    if (this.state.currentPage * this.state.tasksPerPage < this.state.tdList.length) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage +1
      }), () => {
        const indexOfLast = this.state.currentPage * this.state.tasksPerPage;
        const indexOfFirst = indexOfLast - this.state.tasksPerPage;
        const viewedTasks = this.state.tdList.slice(indexOfFirst, indexOfLast);   
        this.props.handleAtParent(viewedTasks);
      })
    }
  }

  // controlling the select component, setting currentPage to first and passing data to parent element
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      currentPage: 1
    }, () => {
      const indexOfLast = this.state.currentPage * this.state.tasksPerPage;
      const indexOfFirst = indexOfLast - this.state.tasksPerPage;
      const viewedTasks = this.state.tdList.slice(indexOfFirst, indexOfLast);   
      this.props.handleAtParent(viewedTasks);
    })
  };

  render() {
    const {currentPage, tasksPerPage, tdList} = this.state;

    const indexOfLast = currentPage * tasksPerPage;
    const indexOfFirst = indexOfLast - tasksPerPage;
    const indexOfLastTask = Math.min(indexOfLast, tdList.length);

    return (
      <>
        <li className={"tdList__footer"}>
          <p className={"footer__text"}>Rows per page: 
            <select name={"tasksPerPage"} 
                    onChange={e => this.handleChange(e)} 
                    value={tasksPerPage}
                    className={"footer__text__perPage"}>
              <option value={"5"}>5</option>
              <option value={"10"}>10</option>
              <option value={"15"}>15</option>
            </select>
          </p>
          <p className={"footer__text"}>{tdList.length === 0 ? indexOfFirst : indexOfFirst+1} - {indexOfLastTask} of {tdList.length}</p>
          <Button className={"footer__btn"} onClick={e => this.handlePageDown(e)}>
            <i className="fas fa-chevron-left"></i>
          </Button>
          <Button className={"footer__btn"} onClick={e => this.handlePageUp(e)}>
            <i className="fas fa-chevron-right"></i>
          </Button>
        </li>
      </>
    )
  }
}

export default TDPagination;