    State.modify('User', (state = false) => {
      let u = Meteor.user();
      if (u) {
        return {
          loggedIn: true,
          notLoggedIn: false,
          email: u.emails[0].address,
          shortname: u.emails[0].address.split('@')[0],
        };
      } else {
        return {
          loggedIn: false,
          notLoggedIn: true,
          email: undefined,
          shortname: undefined
        };
      }
    });