    State.modify('Day', (state = false) => {
      let numericalDate = State.get('Timeselect.numericalDate');
      let i = Incidents.findOne({
        userId: Meteor.userId(),
        "enter.date": numericalDate
      }, {
        fields: {
          enter: true,
          exit: true,
          work: true
        }
      });
      if (i) {
        i.notYetEntered = !i.enter;
        return i;
      } else {
        return {
          enter: false,
          exit: false,
          work: false,
          notYetEntered: true
        }; // State won't update if you return 'undefined' - must return something, at least 'false'
      }
    });
