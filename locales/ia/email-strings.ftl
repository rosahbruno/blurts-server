# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

# Firefox Monitor is a product name and should not be translated.
-product-name = Firefox Monitor
# Firefox is a brand name and should not be translated.
-brand-name = Firefox
# Firefox Relay is a product name and should not be translated.
-product-name-relay = Firefox Relay
# Mozilla VPN is a product name and should not be translated.
-product-name-vpn = Mozilla VPN
# A link to legal information about mozilla products.
legal = Legal
# Unsubscribe link in email.
email-unsub-link = Remover le subscription
# This string appears in the footer of breach report and breach alert emails.
# { $unsubLink } is a link to the user's dashboard where they can unsubscribe from Monitor
# and uses the text from { email-unsub-link }. { $faqLink } is a link to the
# Firefox Monitor SUMO page and uses the text from { frequently-asked-questions }.
email-footer-blurb = Tu recipe iste email perque tu es inscribite al avisos de { -product-name }. Non vole tu plus iste emails? { $unsubLink }. Iste email ha essite inviate automaticamente. Pro supporto, visita { $faqLink }.
# Button text
verify-email-cta = Verificar le email
# Headline of verification email
email-link-expires = Iste ligamine expira in 24 horas

##

# Subject line of email
email-subject-found-breaches = { -product-name } trovava i tu informationes in le violationes sequente
# Subject line of email
email-subject-no-breaches = { -product-name } non ha trovate alcun violation cognoscite
# Subject line of email
email-subject-verify = Verifica tu adresse de e-mail pro { -product-name }
fxm-warns-you-no-breaches =
    { -product-name } te adverti sur violationes de datos que implica tu informationes personal. 
    Presentemente, nulle violationes ha essite trovate. Nos te inviara un aviso si tu adresse de e-mail appare in un nove violation.
email-breach-alert-blurb = { -product-name } te adverti re violationes de datos que involve tu informationes personal. Nos ha justo recipite detalios re un altere violation de datos de un compania.

## 2022 email template. HTML tags should not be translated, e.g. `<a>`

# Have I Been Pwned attribution
# Variables:
#   $hibp-link-attr (String) - Link to Have I Been Pwned
email-2022-hibp-attribution = Violation de datos fornite per <a { $hibp-link-attr }>{ -brand-HIBP }</a>

## Verification email

email-verify-heading = Salveguarda tu datos, desde subito
email-verify-subhead = Verifica tu email pro initiar a proteger tu datos post un violation.
email-verify-simply-click = Simplemente clicca le ligamine infra pro finir de verificar tu conto.

## Breach report

email-breach-summary = Ecce tu summario de violationes de datos
# Variables:
#   $email-address (string) - Email address, bolded
email-breach-detected = Le resultatos del recerca pro tu conto { $email-address } ha disvelate que tu email forsan ha essite exponite. Nos consilia que tu ora age pro resolver iste violation.
# Variables:
#   $email-address (string) - Email address
email-breach-detected-2 = Le resultatos del recerca pro tu conto <b> { $email-address } </b> ha disvelate que tu email forsan ha essite exponite. Nos consilia que tu ora age pro resolver iste violation.
email-dashboard-cta = Va al pannello de controlo

## Breach alert

email-spotted-new-breach = Nos ha individuate un nove violation de datos
