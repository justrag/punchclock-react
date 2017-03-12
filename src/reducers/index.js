    Meteor.setInterval(function() {
      Dispatch('CLOCK_TICK');
    }, 1000);
