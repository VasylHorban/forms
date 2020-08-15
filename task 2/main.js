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
    const avatarLinks = ['https://image.flaticon.com/icons/svg/146/146035.svg', 'https://image.flaticon.com/icons/svg/146/146036.svg']

    function fillWindow(user) {
        document.querySelector('#avatar').src = checkGender(user)
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

    function checkGender(user) {
        let result = ''
        if (user.gender == 'man') {
            result = avatarLinks[0];
        } else {
            result = avatarLinks[1]
        }
        return result;
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
                document.querySelector('#notification').innerHTML = '*invalide email';
            } else {
                document.querySelector('#notification').innerHTML = '';
            }
        })
    }

    function submit() {
        document.querySelector('#form-container').style.display = 'none'
        clear();
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
    
    function clear(){
        forms.name.value = ''
        forms['second-name'].value = ''
        forms.email.value = ''
        forms.position.value = 'Choose...'

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

