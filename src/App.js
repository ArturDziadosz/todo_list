import React, {Component} from 'react';
import './App.scss';

import Header from './components/Header';
import Form from './components/Form';
import ToDoList from './components/ToDoList';
import Footer from './components/Footer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newlyAddedTask: {
        inputValue: "",
        priority: ""
      }
    }
  }

  // passing values from Form to ToDoList with clearing the state to be able to add the same value task
  newlyAddedTask = (inputValue, priority) => {
    this.setState({
      newlyAddedTask: {
        inputValue: inputValue,
        priority: priority
      }
    }, () => {
      this.setState({
        newlyAddedTask: {
          inputValue: ""
        }
      })
    })
  }

  render () {

    return (
      <>
        <Header />
        <main className={"container"}>
          <Form handleAtParent={(inputValue, priority) => this.newlyAddedTask(inputValue, priority)}/>
          <ToDoList newlyAddedTask={this.state.newlyAddedTask}/>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
