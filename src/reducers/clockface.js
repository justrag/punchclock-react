    State.modify('Clockface', (state = false) => {
      if (Action.is("CLOCK_TICK")) {
        let m = moment();
        let timestamp = m.valueOf();
        let utcOffset = m.utcOffset();
        let display = m.format("ddd, D MMM YYYY, HH:mm:ss");
        return {
          timestamp, display
        };
      } else return state;
    });
