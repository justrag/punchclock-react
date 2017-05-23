import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {lifecycle} from 'recompose';
import {WEEK, MONTH, YEAR, INC, DEC} from '../constants/';
import {createStatsAction, statsReset, statsFetch as statsFetchAction} from '../actions/';
import {getStatsOverTime, getStatsSlide, getStatsDays, getStatsShouldWork, getStatsDidWork, getStatsText} from '../selectors/';

const Stats = ({
  slide,
  days,
  shouldWork,
  didWork,
  text,
  overTime,
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
      <p>Tydzień<br />{text.week}</p>
      <div className="statsblock">
        <p><span>{days.week}</span> dni</p>
        <p><span>{shouldWork.week}</span> godzin</p>
        <p><span>{didWork.week}</span>
          <i className={classNames("fa",(overTime.week?"fa-thumbs-up":"fa-thumbs-down"))}></i>
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
      <p>Miesiąc<br />{text.month}</p>
      <div className="statsblock">
        <p><span>{days.month}</span> dni</p>
        <p><span>{shouldWork.month}</span> godzin</p>
        <p><span>{didWork.month}</span>
          <i className={classNames("fa",(overTime.month?"fa-thumbs-up":"fa-thumbs-down"))}></i>
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
      <p>Rok<br />{text.year}</p>
      <div className="statsblock">
        <p><span>{days.year}</span> dni</p>
        <p><span>{shouldWork.year}</span> godzin</p>
        <p><span>{didWork.year}</span>
          <i className={classNames("fa",(overTime.year?"fa-thumbs-up":"fa-thumbs-down"))}></i>
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
    this.props.statsFetch(WEEK, this.props.slide.week);
    this.props.statsFetch(MONTH, this.props.slide.month);
    this.props.statsFetch(YEAR, this.props.slide.year);
  },
  componentDidUpdate(prevProps) {
    if (prevProps.slide.week !== this.props.slide.week) {
      this.props.statsFetch(WEEK, this.props.slide.week);
    };
    if (prevProps.slide.month !== this.props.slide.month) {
      this.props.statsFetch(MONTH, this.props.slide.month);
    };
    if (prevProps.slide.year !== this.props.slide.year) {
      this.props.statsFetch(YEAR, this.props.slide.year);
    };
  }
})(Stats);

const mapStateToProps = state => ({
  slide: getStatsSlide(state),
  days: getStatsDays(state),
  shouldWork: getStatsShouldWork(state),
  didWork: getStatsDidWork(state),
  text: getStatsText(state),
  overTime: getStatsOverTime(state)
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
