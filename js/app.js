/*
    BUILD AGE TESTER
    Dynamically return current date
    Collect input from the form(user)
    Validate the form
    Extract month, day, year for user
    test input against current date
    return result

    if the difference in birth year and current year is greater than 21 => access granted

    else if the difference in birth year and current year is = 21:
        if the difference in birth month and current month is > 0 => access grated
        else if the difference in birthdate and current date are >= 0 => access greated
            else => access denied
        else acess denied
    else access denied
*/

let bornBefore = document.getElementById('bornBefore');
let today = new Date();
// console.log(today);

bornBefore.innerText = `${today.getMonth() + 1}-${today.getDate() + 1}-${today.getFullYear() - 21}`;

bornBefore.style.color = 'red';

class Tester {
    constructor(){
        this.ageData = {
            date: '',
            month: '',
            year: '',
            currDay: '',
            currMonth: '',
            currYear: '',

        }
        this.form = document.getElementById('form');
    }
    init(){
        this.formSubmit();
    }
    formSubmit(){
        this.form.addEventListener('submit', (e)=> {
            e.preventDefault()
            // console.log('click');
            this.setAge();
        })
    }
    //test our date
    setAge(){
        //get current date
        let currDate = new Date();
        let currMonth = currDate.getMonth() + 1;
        let currDay = currDate.getDate();
        let currYear = currDate.getFullYear();

            //get dob from input
        let dob = document.getElementById('dob').value;
        // console.log(dob);
        let birthYear = parseInt(dob.slice(0, 4));
        let birthMonth = parseInt(dob.slice(5, 7));
        let birthDay = parseInt(dob.slice(8, 10));
        // console.log(birthMonth, birthDay, birthYear)
        this.ageData = {
            date: birthDay,
            month: birthMonth,
            year: birthYear,
            currDay: currDay,
            currMonth: currMonth,
            currYear: currYear
        }
        // console.log(this.ageData);
        this.ageTest();
    }
    accessGranted(access){
        let display = document.getElementById('display');
        let denied = {
            color:'red',
            textTransform: 'uppercase'
        }
        
        let granted = {
            color: 'green',
            textTransform: 'capitalize'
        }

        if(access == 'denied'){
            display.innerText = 'access denied';
            for(let prop in denied){
                display.style[prop] = denied[prop]
            }
        }else if(access == 'granted'){
            display.innerText = 'access granted';
            for(let prop in granted){
                display.style[prop] = granted[prop];
            }
        }

        
    }
    ageTest(){
        let yearTest = this.ageData.currYear - this.ageData.year;
        let monthTest = this.ageData.currMonth - this.ageData.month;
        let dayTest = this.ageData.currDay - this.ageData.date;

        if(yearTest > 21) {
            this.accessGranted('granted');
        } else if(yearTest === 21){
            if(monthTest > 0) {
                this.accessGranted('granted');
            } else if(monthTest === 0) {
                if(dayTest > 0) {
                    this.accessGranted('granted');
                } else {
                    this.accessGranted('denied')
                }
            } else {
                this.accessGranted('denied');
            }
        } else {
this.accessGranted('denied');
        }
    }
}
let action = new Tester();
action.init();