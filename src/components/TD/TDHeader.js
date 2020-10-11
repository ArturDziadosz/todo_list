import React, {Component} from 'react';

import './TDHeader.scss';

class TDHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeFilter: this.props.activeFilter
    }
  }

  // updating state when new props come to show user active filter
  componentDidUpdate(prevProps) {
    if (this.props.activeFilter !== prevProps.activeFilter) {
      this.setState({
        activeFilter: this.props.activeFilter
      })
    }
  }

  // passing to parent data with active filter
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
      case "checked":
        e.target.dataset.sort = "notChecked";
        this.props.handleAtParentSort(e.target.dataset.sort);
      break;
      case "notChecked":
        e.target.dataset.sort = "checked";
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
          <div className={"col-8 header__text"}>
            <span onClick={e => this.handleSort(e)} data-sort={"za"}>Task Name</span>
            <i className={"header__text__filter fas fa-sort-alpha-down"} style={this.state.activeFilter.azFilter ? {"display": "block"} : {"display": "none"}} />
            <i className={"header__text__filter fas fa-sort-alpha-down-alt"} style={this.state.activeFilter.zaFilter ? {"display": "block"} : {"display": "none"}} />
          </div>
          <div className={"col-2 header__priority"}>
            <span onClick={e => this.handleSort(e)} data-sort={"descent"}>Priority</span>
            <i className={"header__priority__filter fas fa-sort-amount-down-alt"} style={this.state.activeFilter.ascentPriority ? {"display": "block"} : {"display": "none"}} />
            <i className={"header__priority__filter fas fa-sort-amount-down"} style={this.state.activeFilter.descentPriority ? {"display": "block"} : {"display": "none"}} />
          </div>
          <div className={"col-2 header__done"}>
            <span onClick={e => this.handleSort(e)} data-sort={"notChecked"}>Done</span>
            <i className={"header__done__filter fas fa-check"} style={this.state.activeFilter.checked ? {"display": "block"} : {"display": "none"}} />
            <i className={"header__done__filter fas fa-times"} style={this.state.activeFilter.notChecked ? {"display": "block"} : {"display": "none"}} />
          </div>
        </li>
      </>
    )
  }
}

export default TDHeader;