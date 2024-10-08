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
legal = Cyfreithiol
# Unsubscribe link in email.
email-unsub-link = Dad-danysgrifio
# This string appears in the footer of breach report and breach alert emails.
# { $unsubLink } is a link to the user's dashboard where they can unsubscribe from Monitor
# and uses the text from { email-unsub-link }. { $faqLink } is a link to the
# Firefox Monitor SUMO page and uses the text from { frequently-asked-questions }.
email-footer-blurb = Rydych yn derbyn yr e-bost hwn oherwydd eich bod wedi cofrestru ar gyfer rhybuddion { -product-name }. Dim eisiau'r e-byst hyn bellach? { $unsubLink }. Mae hwn yn e-bost awtomataidd. Am gymorth, ewch i { $faqLink }.
# Button text
verify-email-cta = Dilysu E-bost
# Headline of verification email
email-link-expires = Daw'r ddolen hon i ben mewn 24 awr

##

# Subject line of email
email-subject-found-breaches = Mae { -product-name } wedi canfod gwybodaeth amdanoch yn y tor-data yma
# Subject line of email
email-subject-no-breaches = Nid yw { -product-name } wedi canfod unrhyw dor-data hysbys
# Subject line of email
email-subject-verify = Gwirio eich e-bost ar gyfer { -product-name }
fxm-warns-you-no-breaches = Mae { -product-name } yn eich rhybuddio am dor-data sy'n cynnwys eich manylion personol. Hyd yn hyn, nid ydym wedi darganfod unrhyw dor-data. Byddwn yn anfon rhybudd atoch os bydd eich cyfeiriad e-bost yn ymddangos mewn tor-data newydd.
email-breach-alert-blurb = Mae { -product-name } yn eich rhybuddio am dor-data sy'n cynnwys eich manylion personol. Rydym newydd dderbyn fanylion am dor-data cwmni arall.

## 2022 email template. HTML tags should not be translated, e.g. `<a>`

# Have I Been Pwned attribution
# Variables:
#   $hibp-link-attr (String) - Link to Have I Been Pwned
email-2022-hibp-attribution = Data tor-data wedi'i ddarparu gan <a { $hibp-link-attr }>{ -brand-HIBP }</a>

## Verification email

email-verify-heading = Diogelwch eich data, gan ddechrau nawr
email-verify-subhead = Dilyswch eich e-bost i ddechrau diogelu eich data ar ôl tor-data.
email-verify-simply-click = Cliciwch ar y ddolen isod i orffen dilysu'ch cyfrif.

## Breach report

email-breach-summary = Dyma eich crynodeb tor-data
# Variables:
#   $email-address (string) - Email address, bolded
email-breach-detected = Mae canlyniadau chwilio eich cyfrif { $email-address } wedi canfod y gallai eich e-bost fod wedi'i ddatgelu. Rydym yn argymell eich bod yn gweithredu nawr i ddatrys y tor-data hwn.
# Variables:
#   $email-address (string) - Email address
email-breach-detected-2 = Mae canlyniadau chwilio eich cyfrif <b> { $email-address }</b> wedi canfod y gallai eich e-bost fod wedi'i ddatgelu. Rydym yn argymell eich bod yn gweithredu nawr i ddatrys y tor-data hwn.
email-dashboard-cta = Mynd i'r Bwrdd Gwaith

## Breach alert

email-spotted-new-breach = Rydym wedi gweld tor-data newydd
