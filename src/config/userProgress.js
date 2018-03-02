export default {
  userID: 1234,
  firstName: "Joe",
  lastName: "Seph",
  progress: {
    aaaaa: {
      unitLocked: false,
      unitCompleted: true,
      lessons: [
        {u01l01: true},
        {u01l02: true},
        {u01l03: true},
        {u01l04: true},
        {u01l05: true},
        {u01l06: true},
      ]
    },
    bbbbb: {
      unitLocked: false,
      unitCompleted: true,
      lessons: [
        {u02l01: true},
        {u02l02: true},
        {u02l03: true}
      ]
    },
    ccccc: {
      unitLocked: false,
      unitCompleted: false,
      lessons: [
        {u03l01: true},
        {u03l02: true},
        {u03l03: false},
        {u03l04: false},
        {u03l05: false},
        {u03l06: false},
      ]
    },
    ddddd: {
      unitLocked: true,
      unitCompleted: false,
      lessons: [
        {u04l01: false},
        {u04l02: false},
        {u04l03: false}
      ]
    },
    eeeee: {
      unitLocked: true,
      unitCompleted: false,
      lessons: [
        {lOne: false},
        {lTwo: false},
        {lThree: false}
      ]
    },
  }
}
