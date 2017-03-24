import React from 'react';
const Stats = () => <div>Stats</div>;
export default Stats;


const MiniStats = ({
STATSBROWSE_CHANGED,
STATSBROWSE_RESET,
Stats.week.unminusable,
Stats.week.date,
Stats.week.days,
Stats.week.shift,
Stats.week.diff,
Stats.week.thumbsUp,

Stats.month.unminusable,
Stats.month.unmplusable,
Stats.month.date,
Stats.month.days,
Stats.month.shift,
Stats.month.diff,
Stats.month.thumbsUp,

Stats.year.unminusable,
Stats.year.unmplusable,
Stats.year.date,
Stats.year.days,
Stats.year.shift,
Stats.year.diff,
Stats.year.thumbsUp,

  }) => (
  <div class="vertical ministats">
  <div class="statsrow">
      <a dispatch="STATSBROWSE_CHANGED" data-period="week" data-direction="minus" disabled={{Stats.week.unminusable}} class="button">
      <i class="fa fa-lg fa-chevron-left"></i>
      </a> 
  <p>Tydzień<br />{{Stats.week.date}}</p>
  <div class="statsblock">
  <p><span>{{Stats.week.days}}</span> dni</p>
  <p><span>{{Stats.week.shift}}</span> godzin</p>
  <p><span>{{Stats.week.diff}}</span>
{{#if Stats.week.thumbsUp}}
<i class="fa fa-thumbs-up"></i>
{{else}}
<i class="fa fa-thumbs-down"></i>
{{/if}}
  </p>
  </div>
      <a dispatch="STATSBROWSE_CHANGED" data-period="week" data-direction="plus" disabled={{Stats.week.unplusable}} class="button">
      <i class="fa fa-lg fa-chevron-right"></i>
      </a>  
  </div>
  <div class="statsrow">
      <a dispatch="STATSBROWSE_CHANGED" data-period="month" data-direction="minus" disabled={{Stats.month.unminusable}} class="button">
      <i class="fa fa-lg fa-chevron-left"></i>
      </a> 
  <p>Miesiąc<br />{{Stats.month.date}}</p>
  <div class="statsblock">
  <p><span>{{Stats.month.days}}</span> dni</p><p><span>{{Stats.month.shift}}</span> godzin</p><p><span>{{Stats.month.diff}}</span>
{{#if Stats.month.thumbsUp}}
<i class="fa fa-thumbs-up"></i>
{{else}}
<i class="fa fa-thumbs-down"></i>
{{/if}}
  </p>
  </div>
      <a dispatch="STATSBROWSE_CHANGED" data-period="month" data-direction="plus" disabled={{Stats.month.unplusable}} class="button">
      <i class="fa fa-lg fa-chevron-right"></i>
      </a>  
  </div>
  <div class="statsrow">
      <a dispatch="STATSBROWSE_CHANGED" data-period="year" data-direction="minus" disabled={{Stats.year.unminusable}} class="button">
      <i class="fa fa-lg fa-chevron-left"></i>
      </a> 
  <p>Rok<br />{{Stats.year.date}}</p>
  <div class="statsblock">
  <p><span>{{Stats.year.days}}</span> dni</p><p><span>{{Stats.year.shift}}</span> godzin</p><p><span>{{Stats.year.diff}}</span>
  {{#if Stats.year.thumbsUp}}
<i class="fa fa-thumbs-up"></i>
{{else}}
<i class="fa fa-thumbs-down"></i>
{{/if}}
  </p>
</div>
      <a dispatch="STATSBROWSE_CHANGED" data-period="year" data-direction="plus" disabled={{Stats.year.unplusable}} class="button">
      <i class="fa fa-lg fa-chevron-right"></i>
      </a>  
  </div>
      <a dispatch='STATSBROWSE_RESET' class="button"><i class="fa fa-lg fa-refresh"></i></a>  
  </div>
);

export default MiniStats;
