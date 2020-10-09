import React, {Component} from 'react';

import './TDHeader.scss';

class TDHeader extends Component {

  render() {
    return (
      <>
        <li className={"tdList__header"}>
          <div className={"col-8"}>
            Task Name
          </div>
          <div className={"col-2"}>
            Priority
          </div>
          <div className={"col-2"}>
            Done
          </div>
        </li>
      </>
    )
  }
}

export default TDHeader;