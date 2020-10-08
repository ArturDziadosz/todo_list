import React, {Component} from 'react';
import './App.scss';

import Header from './components/Header';
import Form from './components/Form';
import ToDoList from './components/ToDoList';
import Footer from './components/Footer';

class App extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      newlyAddedTask: ""
    }
  }

  newlyAddedTask = (newlyAddedTask) => {
    this.setState({
      newlyAddedTask: newlyAddedTask
    })
  }

  render () {

    return (
      <>
        <Header />
        <main className={"container"}>
          <Form handleAtParent={this.newlyAddedTask}/>
          <ToDoList newlyAddedTask={this.state.newlyAddedTask}/>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
