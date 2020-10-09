import React, {Component} from 'react';

import './Form.scss';

import {TextField, Button} from '@material-ui/core';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      priority: "Low"
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputValue === "") {
      return null
    }
    this.props.handleAtParent(this.state.inputValue.trim(), this.state.priority);
    this.setState({
      inputValue: ""
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render() {
    return (
      <>
        <form className={"row row__form"} onSubmit={(inputValue, priority) => this.handleSubmit(inputValue, priority)}>
          <TextField  className={"col-8"} 
                      variant={"outlined"}
                      autoFocus={true}
                      label={"Add new task"}
                      name={"inputValue"}
                      onChange={e => this.handleChange(e)}
                      value={this.state.inputValue} />
          <select className={"col-2"} name={"priority"} onChange={e => this.handleChange(e)}>
            <option value={"Low"}>Low</option>
            <option value={"Medium"}>Medium</option>
            <option value={"High"}>High</option>
          </select>
          <Button className={"col-2"} variant={"contained"} color={"primary"} type={"submit"}>
            <i className="fas fa-plus"></i>
          </Button>
        </form>
      </>
    )
  }
}

export default Form;