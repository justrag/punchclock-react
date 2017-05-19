import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {lifecycle} from 'recompose';
import {WEEK, MONTH, YEAR, INC, DEC} from '../constants/';
import {createStatsAction, statsReset, statsFetch as statsFetchAction} from '../actions/';
import {weeksAgo, monthsAgo, yearsAgo} from '../libs/timeFunctions';

const Stats = ({
  stats,
  yearText,
  monthText,
  weekText,
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
      <p>Tydzień<br />{weekText}</p>
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
      <p>Miesiąc<br />{monthText}</p>
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
      <p>Rok<br />{yearText}</p>
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

const LifecycledStats = lifecycle({
  componentDidMount() {
    this.props.statsFetch(WEEK);
    this.props.statsFetch(MONTH);
    this.props.statsFetch(YEAR);
  },
  componentDidUpdate(prevProps) {
    if (prevProps.stats.week.slide !== this.props.stats.week.slide) {
      this.props.statsFetch(WEEK);
    };
    if (prevProps.stats.month.slide !== this.props.stats.month.slide) {
      this.props.statsFetch(MONTH);
    };
    if (prevProps.stats.year.slide !== this.props.stats.year.slide) {
      this.props.statsFetch(YEAR);
    };
  }
})(Stats);

const mapStateToProps = state => ({
  stats: state.stats,
  weekText: weeksAgo(state.stats.week.slide),
  monthText: monthsAgo(state.stats.month.slide),
  yearText: yearsAgo(state.stats.year.slide),
});

const mapDispatchToProps = ({
  statsWeekDec: () => createStatsAction(WEEK, DEC)(),
  statsWeekInc: () => createStatsAction(WEEK, INC)(),
  statsMonthDec: () => createStatsAction(MONTH, DEC)(),
  statsMonthInc: () => createStatsAction(MONTH, INC)(),
  statsYearDec: () => createStatsAction(YEAR, DEC)(),
  statsYearInc: () => createStatsAction(YEAR, INC)(),
  statsReset: () => statsReset(),
  statsFetch: statsFetchAction
});

export default connect(mapStateToProps, mapDispatchToProps)(LifecycledStats);
