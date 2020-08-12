const forms = document.forms[0].elements;
console.log(forms)
forms.move.addEventListener('click', e => {
    if (!isEmptyForm(forms.first)) {
        forms.second.value = forms.first.value
        forms.first.value = ''
    }
})
forms.placeholder.addEventListener('blur', e => {
    if (!isEmptyForm(forms.placeholder)) {
        forms.placeholder.placeholder = forms.placeholder.value
    }
})

function isEmptyForm(form) {
    if (form.value) {
        return false
    }
    return true
}
