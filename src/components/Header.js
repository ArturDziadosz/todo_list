import React, {Component} from 'react';

import './Header.scss';

class Header extends Component {
  render() {
    return (
      <>
        <header className={"container"} name={"header"}>
          <section className={"row"}>
            <h1 className={"col-11 header__title"}>To Do List</h1>
          </section>
        </header>
      </>
    )
  }
}

export default Header;