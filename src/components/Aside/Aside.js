import React, { Component } from 'react';


class Aside extends Component {
  render() {
    return (
      <aside className="aside-menu">
        <div className="list-group list-group-accent">
          <div className="list-group-item list-group-item-secondary border-0 m-0 text-center font-weight-bold text-muted text-uppercase small">Notifiche</div>
          <div className="list-group-item b-new-notif">
            Il tuo feed è stato correttamente caricato su Kylo
          </div>
        </div>
      </aside>
    )
  }
}

export default Aside;
