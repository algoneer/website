
function t(key) {
    var str = translations[window.language][key]
    if (str === undefined)
        return "[no translation available for key " + key + "]"
    var formattedStr = str.format(...Array.prototype.slice.call(arguments, 1))
    return formattedStr
}

var translations = {
    'de' : {
        'submit' : 'Abschicken',
        'please-wait' : 'Bitte warten...',
        'company-name' : 'Unternehmen',
        'contact-name' : 'Kontaktperson',
        'phone' : 'Telefonnummer',
        'phone-placeholder': '+49-1234-5678',
        'company-placeholder' : 'Ihre Firma',
        'name-placeholder' : 'Ihr Name',
        'email-placeholder' : 'Ihre E-Mail',
        'email' : 'E-Mail',
        'signup-email' : 'info@algoneer.org',
        'email-missing' : 'Bitte geben Sie eine E-Mail Adresse an.',
        'email-invalid' : 'Bitte geben Sie eine gültige E-Mail Adresse an.',
        'company-name-missing' : 'Bitte geben Sie einen Firmennamen an.',
        'company-name-invalid' : 'Bitte geben Sie einen gültigen Firmennamen an (mindestens drei Zeichen, maximal 50).',
        'contact-name-missing' : 'Bitte geben Sie einen Kontaktnamen an.',
        'contact-name-invalid' : 'Bitte geben Sie einen gültigen Namen an (mindestens drei Zeichen, maximal 50).',
        'phone-number-invalid' : 'Bitte geben Sie eine gültige Telefonnummer an (bitte nur Ziffern und die Zeichen "-+/").',
        'thanks' : 'Vielen Dank!',
        'data-has-been-saved' : 'Ihre Angaben wurden gespeichert, wir werden Sie in Kürze mit weiteren Details kontaktieren!',
        'something-went-wrong' : `Beim Versenden Ihrer Daten ist leider etwas schiefgegangen. Sie können uns alternativ
                                  auch eine E-Mail an {email} schicken. Wir bitten die Unannehmlichkeiten zu entschuldigen.`,
    },
    'en' : {
        'submit' : 'Submit',
        'please-wait' : 'Please wait...',
        'company-name' : 'Organization Name',
        'contact-name' : 'Contact Name',
        'phone-placeholder' : 'Your phone number (optional)',
        'email-placeholder' : 'Your e-mail',
        'name-placeholder' : 'Your name',
        'company-placeholder' : 'Your organization',
        'phone' : 'Phone',
        'email' : 'E-Mail',
        'signup-email' : 'info@algoneer.com',
        'email-missing' : 'Please enter an e-mail address.',
        'email-invalid' : 'Please enter a valid e-mail address.',
        'company-name-missing' : 'Please enter a company name.',
        'company-name-invalid' : 'Please enter a valid company name (at least three characters).',
        'contact-name-missing' : 'Please enter a contact name.',
        'contact-name-invalid' : 'Please enter a valid contact name.',
        'phone-number-invalid' : 'Please enter a valid phone number (only numbers and "+/-").',
        'thanks' : 'Thanks!',
        'data-has-been-saved' : 'Your data has been saved, we will contact you soon!',
        'something-went-wrong' : `We are very sorry but something went wrong when sending the data to our server.
                                  You can drop us an e-mail to {email} instead to get in touch. 
                                  We apologize for the inconvenience.`,
        'company-size' : 'Organization Size',
        'company-size-placeholder' : 'Your organization size',
        'company-size-invalid' : 'Please enter the size of your organization',
        'specific-interests' : 'Any specific interests?',
        'specific-interests-placeholder' : 'Let us know if we can help you with a specific project or topic...',
    }
}