/** @jsx h */

'use strict';

const { Component, h, render } = window.preact;

/** Example classful component */
class App extends Component {

    componentDidMount() {
        this.setState({ message: 'Hello!' });
    }

    render() {
        const { props } = this
        const { list } = props
        return <div id="app">
            <Form list={list} />
        </div>
    }
}

String.prototype.format = function () {
    "use strict";
    var str = this.toString();

    var t = typeof arguments[0];
    var args
    if (arguments.length == 0)
        args = {}
    else
        args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

    var splits = []

    var s = str
    while (s.length > 0) {
        var m = s.match(/\{(?!\{)([\w\d]+)\}(?!\})/)
        if (m !== null) {
            var left = s.substr(0, m.index)
            var sep = s.substr(m.index, m[0].length)
            s = s.substr(m.index + m[0].length)
            var n = parseInt(m[1])
            splits.push(left)
            if (n != n) { // not a number
                splits.push(args[m[1]])
            } else { // a numbered argument
                splits.push(args[n])
            }
        } else {
            splits.push(s)
            s = ""
        }
    }
    return splits
};

class Form extends Component {

    state = {
        submitting: false,
        status: 'pending',
        data: {},
        errors: {}
    }

    encodeData(obj) {
        var str = []
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
        return str.join("&")
    }

    submitData(data) {

        var xhr = new XMLHttpRequest();   // new HttpRequest instance 
        xhr.open("POST", "https://auth.algoneer.org/v1/contact/submit")
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

        const handleError = () => {
            var json = JSON.parse(xhr.responseText)
            if (json !== undefined && json.errors !== undefined) {
                this.setState({ status: 'pending', errors: json.errors })
            }
            else
                this.setState({ status: 'failed' })
        }

        xhr.onload = () => {
            if (xhr.status != 200 && xhr.status != 201) {
                handleError()
            } else {
                const json = JSON.parse(xhr.responseText)
                this.setState({ status: 'success', data: json })
            }
        }
        xhr.onerror = () => {
            handleError()
        }
        xhr.send(JSON.stringify(data))
    }

    onSubmit(e) {
        e.preventDefault()

        const { state, props } = this
        const { list } = props
        const { data } = state
        const errors = this.validate(data)

        if (Object.keys(errors).length > 0) {
            this.setState({ errors: errors })
            return
        }

        this.setState({ status: 'sending', errors: {} })

        this.submitData({
            email: data.email,
            name: data.name,
            company: data.company,
            phone: data.phone,
            extra_data: {
                list: list,
                company_size: data.companySize,
                specific_interests: data.specificInterests,
            },
        })
    }

    validate(data) {
        var errors = {}
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        if (!data.email) {
            errors.email = t('email-missing')
        }
        if (!emailRegex.test(data.email)) {
            errors.email = t('email-invalid')
        }
        var companyRegex = /^.{3,50}$/i;
        if (!data.company) {
            errors.company = t('company-name-missing')
        }
        if (!companyRegex.test(data.company)) {
            errors.company = t('company-name-invalid')
        }
        var nameRegex = /^.{3,50}$/i;
        if (!data.name) {
            errors.name = t('contact-name-invalid')
        }
        if (!data.companySize) {
            errors.companySize = t('company-size-invalid')
        }
        if (!nameRegex.test(data.name)) {
            errors.name = t('contact-name-invalid')
        }
        var phoneRegex = /^[0-9\-\/\+]{3,50}$/i;
        if (data.phone) {
            //validate the phone number
            if (!phoneRegex.test(data.phone)) {
                errors.phone = t('phone-number-invalid')
            }
        }
        return errors
    }

    setValue(name, e) {
        var data = this.state.data
        data[name] = e.target.value
        this.setState({ data: data })
    }

    renderSuccess() {
        return (
            <div>
                <h2>{t('thanks')}</h2>
                <p class="text-success">
                    {t('data-has-been-saved')}
                </p>
            </div>
        )
    }

    render() {
        if (this.state.status == 'success')
            return this.renderSuccess()
        else
            return this.renderForm()
    }

    renderForm() {
        var state = this.state
        var data = state.data
        var errors = state.errors

        function errorFor(field) {
            if (!errors[field])
                return null
            return <p class="text-danger">
                {errors[field]}
            </p>
        }

        var status = this.state.status

        var failureNotice
        if (status == 'failed') {
            failureNotice = <p class="alert alert-danger">
                {t('something-went-wrong', { email: <a href={'mailto:' + t('signup-email')}>{t('signup-email')}</a> })}
            </p>
        }

        return (
            <form ref={c => this.form = c} id="signup" onSubmit={this.onSubmit.bind(this)}>
                {failureNotice}
                <fieldset disabled={!!(status === 'sending')}>

                    <div class="form-group row">
                        <label for="name" class="col-md-2 col-lg-2 col-form-label">{t('contact-name')}</label>
                        <div class="col-md-4 col-lg-4">
                            <input type="text"
                                class="form-control"
                                id="name"
                                placeholder={t('name-placeholder')}
                                onChange={this.setValue.bind(this, 'name')}
                                value={data.name || ''}
                            />
                            {errorFor('name')}
                        </div>
                        <label for="company" class="col-md-2 col-lg-2 col-form-label">{t('company-name')}</label>
                        <div class="col-md-4 col-lg-4">
                            <input type="text"
                                class="form-control"
                                id="company"
                                placeholder={t('company-placeholder')}
                                onChange={this.setValue.bind(this, 'company')}
                                value={data.company || ''}
                            />
                            {errorFor('company')}
                        </div>
                    </div>


                    <div class="form-group row">
                        <label for="email" class="col-md-2 col-lg-2 col-form-label">{t('email')}</label>
                        <div class="col-md-4 col-lg-4">
                            <input
                                type="email"
                                class="form-control"
                                id="email"
                                placeholder={t('email-placeholder')}
                                onChange={this.setValue.bind(this, 'email')}
                                value={data.email || ''}
                            />
                            {errorFor('email')}
                        </div>
                        <label for="phone" class="col-md-2 col-lg-2 col-form-label">{t('phone')}</label>
                        <div class="col-md-4 col-lg-4">
                            <input type="phone"
                                class="form-control"
                                id="phone"
                                placeholder={t('phone-placeholder')}
                                onChange={this.setValue.bind(this, 'phone')}
                                value={data.phone || ''}
                            />
                            {errorFor('phone')}
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="email" class="col-md-2 col-lg-2 col-form-label">{t('company-size')}</label>
                        <div class="col-md-4 col-lg-4">
                            <select className="form-control" id="company-size"
                                onChange={this.setValue.bind(this, 'companySize')}
                                value={data.companySize || ''} >
                                <option value="">{t('company-size-placeholder')}</option>
                                <option value="1-2">1-2</option>
                                <option value="3-10">3-10</option>
                                <option value="11-100">11-100</option>
                                <option value="101-1000">101-1000</option>
                                <option value="1001">&gt; 1001</option>
                            </select>
                            {errorFor('companySize')}
                        </div>
                        <label for="phone" class="col-md-2 col-lg-2 col-form-label">{t('specific-interests')}</label>
                        <div class="col-md-4 col-lg-4">
                            <textarea
                                class="form-control"
                                id="specific-interests"
                                placeholder={t('specific-interests-placeholder')}
                                onChange={this.setValue.bind(this, 'specificInterests')}
                                value={data.specificInterests || ''}
                            />
                            {errorFor('specificInterests')}
                        </div>
                    </div>

                    <div class="form-group row align-items-center">
                        <label class="d-xs-none col-md-2 col-lg-2 col-form-label"></label>
                        <div class="col-md-10 col-lg-10">
                            <button type="submit"
                                class="btn btn-contact btn-lg">
                                {status == 'sending' ? t('please-wait') : t('submit')}
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
        );
    }
}

function renderSignup() {
    if (render === undefined)
        setTimeout(renderSignup, 1000)
    var element = document.getElementById('signup-wrapper')
    element.innerHTML = ''
    render(h(App, { list: window.signupList }), element)
}

window.addEventListener('load', renderSignup)
