  const findTodaysIncident = (userId) => Incidents.findOne({
    userId: userId,
    "enter.date": TF.todaysDate()
  });

const findMatchingIncident = (userId, enterDate) => Incidents.findOne({
    userId: userId,
    "enter.date": enterDate
  });

  const checkUser = () => {
    let userId = Meteor.userId();
    if (!userId)
      throw new Meteor.Error("not-logged-in", "Nie jesteś zalogowany.");
    return userId;
  }
