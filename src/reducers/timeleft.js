    State.modify('Timeleft', (state = false) => {
      let timestamp=TF.diffTimestamp(State.get('Day.enter.timestamp'), State.get('Clockface.timestamp'), State.get('Shift.length'));
      let text=TF.formatDiffTimestamp(timestamp);
      let absText=text.substring(1);
      let gone= (timestamp>=0);
      return {text, absText, gone};
    });
