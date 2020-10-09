import React, {Component} from 'react';

import './TDHeader.scss';

class TDHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeFilter: this.props.activeFilter
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeFilter !== prevProps.activeFilter) {
      this.setState({
        activeFilter: this.props.activeFilter
      })
    }
  }

  handleSort = e => {
    switch (e.target.dataset.sort) {
      case "az":
        e.target.dataset.sort = "za";
        this.props.handleAtParentSort(e.target.dataset.sort);
      break;
      case "za":
        e.target.dataset.sort = "az";
        this.props.handleAtParentSort(e.target.dataset.sort);
      break;
      case "descent":
        e.target.dataset.sort = "ascent";
        this.props.handleAtParentSort(e.target.dataset.sort);
      break;
      case "ascent":
        e.target.dataset.sort = "descent";
        this.props.handleAtParentSort(e.target.dataset.sort);
      break;
      default:
        console.log("switch error");
    }
  }

  render() {
    return (
      <>
        <li className={"tdList__header"}>
          <div className={"col-8"}>
            <p onClick={e => this.handleSort(e)} data-sort={"za"}>Task Name</p>
            <p style={this.state.activeFilter.azFilter ? {"display": "block"} : {"display": "none"}}>AZ</p>
            <p style={this.state.activeFilter.zaFilter ? {"display": "block"} : {"display": "none"}}>ZA</p>
          </div>
          <div className={"col-2"}>
            <p onClick={e => this.handleSort(e)} data-sort={"descent"}>Priority</p>
          </div>
          <div className={"col-2"}>
            <p>Done</p>
          </div>
        </li>
      </>
    )
  }
}

export default TDHeader;