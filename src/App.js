import React, {Component} from 'react';
import './App.scss';

import Header from './components/Header';
import Form from './components/Form';
import ToDoList from './components/ToDoList';
import Footer from './components/Footer';

class App extends Component {

  render () {
    return (
      <>
        <Header />
        <main className={"container"}>
          <Form />
          <ToDoList />
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
