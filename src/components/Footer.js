import React, {Component} from 'react';

import './Footer.scss';

import {Link} from 'react-scroll';
import {Button} from '@material-ui/core'


class Footer extends Component {
  render() {
    return (
      <>
        <footer className={"container"}>
          <section className={"row"}>
            <p className={"col-11 footer__text"}>Designed by <a href={"https://github.com/ArturDziadosz"} target={"_blank"}
               rel={"noopener noreferrer"}>Artur Dziadosz</a></p>
            <Link to={"header"} smooth={true} duration={500}>
              <Button>
                <i className="fas fa-level-up-alt"/>
              </Button>
            </Link>
          </section>
        </footer>
      </>
    )
  }
}

export default Footer;