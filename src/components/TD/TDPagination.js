import React, {Component} from 'react';

import './TDPagination.scss';

class TDPagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      tasksPerPage: 5,
      tdList: this.props.tdList
    }
  }

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

    const indexOfLast = this.state.currentPage * this.state.tasksPerPage;
    const indexOfFirst = indexOfLast - this.state.tasksPerPage;
    const indexOfLastTask = Math.min(indexOfLast, this.state.tdList.length);

    return (
      <>
        <ul>
          <li>Rows per page: 
            <select name={"tasksPerPage"} onChange={e => this.handleChange(e)}>
              <option value={"5"}>
                5
              </option>
              <option value={"10"}>
                10
              </option>
              <option value={"15"}>
                15
              </option>
            </select>

          </li>
          <li>{indexOfFirst+1} - {indexOfLastTask} of {this.state.tdList.length}</li>
          <button onClick={e => this.handlePageDown(e)}>{"<"}</button>
          <button onClick={e => this.handlePageUp(e)}>{">"}</button>
        </ul>
      </>
    )
  }
}

export default TDPagination;