// Some useful functions for javascript Date

const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const areSameDay = (date1, date2) => {
   return date1.getDate() === date2.getDate() &&
      date1.getDay() === date2.getDay() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
}

// converts a date into a unique date string per day
const toDateKey = (date) => {
   let day = dayOfWeek[date.getDay()]
   let dateNum = date.getDate()
   dateNum = dateNum < 10 ? '0' + dateNum : dateNum
   let month = date.getMonth() + 1
   month = month < 10 ? '0' + month : month
   let year = date.getFullYear()

   return `${year}-${month}-${dateNum}`
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