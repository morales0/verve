// Some useful functions for javascript Date

const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const areSameDay = (date1, date2) => {
   return date1.getDate() === date2.getDate() &&
      date1.getDay() === date2.getDay() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
}

// converts a date into a normal string
const toDateKey = (date) => {
   const day = dayOfWeek[date.getDay()]
   const dateNum = date.getDate()
   const month = date.getMonth() + 1
   const year = date.getFullYear()

   return `${day}, ${month}/${dateNum}/${year}`
}

// returns today, yesterday
const toDateString = (date) => {
   const today = new Date()
   const yesterday = new Date()
   yesterday.setDate(today.getDate() - 1)

   if (areSameDay(today, date)) {
      return "Today"
   } else if (areSameDay(yesterday, date)) {
      return "Yesterday"
   } else {
      const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString("en-US", options)
   }
}

export {
   toDateKey,
   toDateString
}