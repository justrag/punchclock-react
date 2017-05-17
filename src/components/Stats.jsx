import React from 'react';
import classNames from 'classnames';

const Stats = ({
  stats,
  statsWeekDec,
  statsWeekInc,
  statsMonthDec,
  statsMonthInc,
  statsYearDec,
  statsYearInc,
  statsReset
}) => (
  <div className="vertical ministats">
    <div className="statsrow">
      <a onClick={statsWeekDec} className="button">
        <i className="fa fa-lg fa-chevron-left"></i>
      </a> 
      <p>Tydzień<br />{stats.week.date}</p>
      <div className="statsblock">
        <p><span>{stats.week.days}</span> dni</p>
        <p><span>{stats.week.shift}</span> godzin</p>
        <p><span>{stats.week.diff}</span>
          <i className={classNames("fa",(stats.week.diff>stats.week.shift)?"fa-thumbs-up":"fa-thumbs-down")}></i>
        </p>
      </div>
      <a onClick={statsWeekInc} className="button">
        <i className="fa fa-lg fa-chevron-right"></i>
      </a>  
    </div>
    <div className="statsrow">
      <a onClick={statsMonthDec} className="button">
        <i className="fa fa-lg fa-chevron-left"></i>
      </a> 
      <p>Miesiąc<br />{stats.month.date}</p>
      <div className="statsblock">
        <p><span>{stats.month.days}</span> dni</p>
        <p><span>{stats.month.shift}</span> godzin</p>
        <p><span>{stats.month.diff}</span>
          <i className={classNames("fa",(stats.month.diff>stats.month.shift)?"fa-thumbs-up":"fa-thumbs-down")}></i>
        </p>
      </div>
      <a onClick={statsMonthInc} className="button">
        <i className="fa fa-lg fa-chevron-right"></i>
      </a>  
    </div>
    <div className="statsrow">
      <a onClick={statsYearDec} className="button">
        <i className="fa fa-lg fa-chevron-left"></i>
      </a> 
      <p>Rok<br />{stats.year.date}</p>
      <div className="statsblock">
        <p><span>{stats.year.days}</span> dni</p>
        <p><span>{stats.year.shift}</span> godzin</p>
        <p><span>{stats.year.diff}</span>
          <i className={classNames("fa",(stats.year.diff>stats.year.shift)?"fa-thumbs-up":"fa-thumbs-down")}></i>
        </p>
      </div>
      <a onClick={statsYearInc} className="button">
        <i className="fa fa-lg fa-chevron-right"></i>
      </a>  
    </div>
    <a onClick={statsReset} className="button"><i className="fa fa-lg fa-refresh"></i></a>  
  </div>
);
export default Stats;
