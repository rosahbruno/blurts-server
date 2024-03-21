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
email-unsub-link =  Unsubscribe

# This string appears in the footer of breach report and breach alert emails.
# { $unsubLink } is a link to the user's dashboard where they can unsubscribe from Monitor
# and uses the text from { email-unsub-link }. { $faqLink } is a link to the
# Firefox Monitor SUMO page and uses the text from { frequently-asked-questions }.
email-footer-blurb = You’re receiving this email because you signed up for { -product-name }
  alerts. No longer want these emails? { $unsubLink }. This is an automated email. For support, visit { $faqLink }.

# Button text
verify-email-cta = Verify Email

# Headline of verification email
email-link-expires = This link expires in 24 hours

##

# Subject line of email
email-subject-found-breaches = { -product-name } found your info in these breaches

# Subject line of email
email-subject-no-breaches = { -product-name } found no known breaches

# Subject line of email
email-subject-verify = Verify your email for { -product-name }

fxm-warns-you-no-breaches = { -product-name } warns you about data breaches involving your personal info.
  So far, no breaches were found. We’ll send you an alert if your email address appears in a new breach.

email-breach-alert-blurb =
  { -product-name } warns you about data breaches involving your personal info.
  We just received details about another company’s data breach.

## 2022 email template. HTML tags should not be translated, e.g. `<a>`

# Have I Been Pwned attribution
# Variables:
#   $hibp-link-attr (String) - Link to Have I Been Pwned
email-2022-hibp-attribution = Breach data provided by <a { $hibp-link-attr }>{ -brand-HIBP }</a>

## Monthly email for unresolved breaches. HTML tags should not be translated, e.g. `<br>`
## Variables:
##   $email-address (string) - Email address

email-unresolved-heading = You have unresolved breaches
email-unresolved-subhead = Your email has been exposed. <br>Fix it right away with { -product-name }.
email-is-affected = Your email, { $email-address }, is affected by at least one data breach
email-more-detail = Sign in to { -product-name } now to see more details about your breaches (including when they occurred and what data was exposed), and learn what you should do when your email’s been exposed in a data breach.
email-breach-status = Current breach status
# table row 1 label
email-monitored = Total emails monitored:
# table row 2 label
email-breach-total = Total number of breaches:
# table row 3 label
email-resolved = Resolved breaches:
# table row 4 label
email-unresolved = Unresolved breaches:
email-resolve-cta = Resolve breaches

## Verification email

email-verify-heading = Safeguard your data, starting right now
email-verify-subhead = Verify your email to start protecting your data after a breach.
email-verify-simply-click = Simply click the link below to finish verifying your account.

## Breach report
## Variables:
##   $email-address (string) - Email address

email-breach-summary = Here’s your data breach summary
email-breach-detected = Search results for your { $email-address } account have detected that your email may have been exposed. We recommend you act now to resolve this breach.
email-dashboard-cta = Go to Dashboard

## Breach alert

email-spotted-new-breach = We’ve spotted a new data breach
