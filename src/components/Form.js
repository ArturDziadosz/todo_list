import React, {Component} from 'react';

import './Form.scss';

import {TextField, Button, InputLabel, FormControl, Select, MenuItem} from '@material-ui/core';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      priority: "Low"
    }
  }

  // submit values with preventing default action, validate input value, pass values to parent element with trimming the input value
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

  // controlling the components
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render() {

    return (
      <>
        <form className={"row row__form"} onSubmit={e => this.handleSubmit(e)}>
          <TextField  className={"col-8 form__text"} 
                      variant={"outlined"}
                      autoFocus={true}
                      label={"Add new task"}
                      name={"inputValue"}
                      onChange={e => this.handleChange(e)}
                      value={this.state.inputValue}
                      type={"text"} />
          <FormControl variant={"outlined"} className={"col-3 form__priority"} > 
            <InputLabel id={"demo-simple-select-outlined-label"}>Priority</InputLabel>
            <Select labelId={"demo-simple-select-outlined-label"}
                    id={"demo-simple-select-outlined"} 
                    label={"Priority"}
                    name={"priority"} 
                    onChange={e => this.handleChange(e)} 
                    value={this.state.priority}
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
          </FormControl>
          <Button className={"col-1 form__btn"} variant={"contained"} color={"primary"} type={"submit"}>
            <i className="fas fa-plus"></i>
          </Button>
        </form>
      </>
    )
  }
}

export default Form;