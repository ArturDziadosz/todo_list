import React, {Component} from 'react';

import './Form.scss';

import {TextField, Button} from '@material-ui/core';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputValue === "") {
      return null
    }
    this.props.handleAtParent(this.state.inputValue.trim());
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
        <form className={"row row__form"} onSubmit={e => this.handleSubmit(e)}>
          <TextField  className={"col-9"} 
                      variant={"outlined"}
                      autoFocus={true}
                      label={"Add new task"}
                      name={"inputValue"}
                      onChange={e => this.handleChange(e)}
                      value={this.state.inputValue} />
          {/* TODO List of priority */}
          <Button className={"col-2"} variant={"contained"} color={"primary"} type={"submit"}>
            <i className="fas fa-plus"></i>
          </Button>
        </form>
      </>
    )
  }
}

export default Form;