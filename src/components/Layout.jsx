import React from 'react';
import Main from './Main';

const Layout = () => (
    <div class="wrapper">
    <nav>
      <a href="{{pathFor "clock"}}" class="{{isActiveRoute 'clock'}}"><i class="fa fa-clock-o"></i><br />Zegar</a>
      <a href="{{pathFor "stats"}}" class="{{isActiveRoute 'stats'}}"><i class="fa fa-calendar"></i><br />Statystyki</a>
      <a href="{{pathFor "settings"}}" class="{{isActiveRoute 'settings'}}"><i class="fa fa-cog"></i><br />Ustawienia</a>
      <a dispatch='LOGGED_OUT' disabled={{User.notLoggedIn}}><i class="fa fa-power-off"></i><br />Wyloguj: {{User.shortname}}</a>
      </nav>
    <section>
<Main />
</section>
    <footer>
    <p>Bardzo</p><p>Ciekawa</p><p>Reklama</p>
    </footer>
    </div>
);

export default Layout;
