    Register(() => {
      switch (Action.type()) {
        case 'ENTERED':
          Meteor.call("addEnter", State.get("Timeselect.timestamp"), State.get("Timeselect.utcOffset"));
          break;
        case 'EXITED':
          Meteor.call("addExit", State.get("Timeselect.timestamp"), State.get("Shift.length"), State.get("Timeselect.utcOffset"));
          break;
        case 'ENTERED_CHANGE':
          Meteor.call("changeEnter", State.get("Timeselect.timestamp"), State.get("Timeselect.utcOffset"));
          break;
        case 'EXITED_CHANGE':
          Meteor.call("changeExit", State.get("Timeselect.timestamp"), State.get("Shift.length"), State.get("Timeselect.utcOffset"));
          break;
        case 'LOGGED_OUT':
          AccountsTemplates.logout();
          break;
      }
    });
