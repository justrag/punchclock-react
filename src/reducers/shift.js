    State.modify('Shift.length', (state = 8) => {
      switch (Action.type()) {
        case 'SHIFTLENGTH_INCREASED':
          if (state <= 11) return state + 1;
          else return state;
        case 'SHIFTLENGTH_DECREASED':
          if (state >= 2) return state - 1;
          else return state;
        default:
          return state;
      }
    });

