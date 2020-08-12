class User {
    constructor(gender, position) {
        this.name;
        this.secondName;
        this.email;
        this.gender = null || gender;
        this.position = null || position;
        this.permission = false;
    }
    setName(name) {
        this.name = name.trim();
    }
    setSecondName(secondname) {
        this.secondName = secondname.trim();
    }
    setEmail(email) {
        this.email = email.trim()
    }
    switchPermission(bool) {
        if (bool != undefined) {
            this.permission = bool
        }
        console.log(this.permission)
    }
    isCorrectEmail(email) {
        let isCorrect = false;
        let index = email.indexOf('@');
        if (index > 0 && index != email.length - 1) {
            isCorrect = true
        }
        return isCorrect;
    }
    isEmptyProp() {
        if (this.name != '' && this.secondName != '' && this.email != '' && this.position != null && this.gender != null) {
            return false
        }
        return true
    }
}
const personalWindow = (function () {
    const window = document.querySelector('#personal-window');

    function fillWindow(user) {
        document.querySelector('#user-name').innerHTML = user.name + ' ' + user.secondName;
        document.querySelector('#user-email').innerHTML = user.email;
        document.querySelector('#user-position').innerHTML = user.position;
        window.style.display = 'block';
        addEvent();
    }

    function addEvent() {
        document.querySelector('#sign-out').addEventListener('click', out)
    }

    function out() {
        window.style.display = 'none'
        formModule.addEvent()
    }
    return {
        fillWindow: fillWindow
    }
})();



const formModule = (function () {
    const forms = document.forms[0].elements;
    let user = new User()

    function addEvent() {
        document.querySelector('#form-container').style.display = 'block'

        forms.submit.addEventListener('click', e => {
            fillData()
        })
        forms.terms.addEventListener('change', e => {
            if (forms.terms.checked) {
                user.switchPermission(true)

            } else {
                user.switchPermission(false)
            }
        })
        forms.email.addEventListener('input', e => {
            if (!user.isCorrectEmail(forms.email.value)) {
                console.log('invalid email')
                document.querySelector('#notification').innerHTML = '*invalide email';
            } else {
                document.querySelector('#notification').innerHTML = '';
            }
        })
    }

    function submit() {
        console.log('top')
        document.querySelector('#form-container').style.display = 'none'
        personalWindow.fillWindow(user);
    }

    function fillData() {
        user.gender = forms.gender.value;
        user.position = forms.position.value;
        user.setName(forms.name.value);
        user.setSecondName(forms['second-name'].value);
        user.setEmail(forms.email.value)
        mainCheck()
    }

    function mainCheck() {
        if (!user.isEmptyProp() && user.permission && user.isCorrectEmail(user.email)) {
            document.querySelector('#alert').innerHTML = '';
            submit()
        } else {
            document.querySelector('#alert').innerHTML = '*incorrect data'
        }
    }
    return {
        addEvent: addEvent
    }
})();

formModule.addEvent()
