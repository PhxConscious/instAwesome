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
        {u01l03: true}
      ]
    },
    bbbbb: {
      unitLocked: false,
      unitCompleted: false,
      lessons: [
        {u02l01: true},
        {u02l02: false},
        {u02l03: false}
      ]
    },
    ccccc: {
      unitLocked: true,
      unitCompleted: false,
      lessons: [
        {u03l01: false},
        {u03l02: false},
        {u03l03: false}
      ]
    },
    ddddd: {
      unitCompleted: false,
      lessons: [
        {lOne: false},
        {lTwo: false},
        {lThree: false}
      ]
    },
    eeeee: {
      unitCompleted: false,
      lessons: [
        {lOne: false},
        {lTwo: false},
        {lThree: false}
      ]
    },
  }
}
