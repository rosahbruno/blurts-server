/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createTransport } from 'nodemailer'
import { URL } from 'url'

import mozlog from './log.js'
import AppConstants from '../app-constants.js'
import { getMessage } from '../utils/fluent.js'

const log = mozlog('email-utils')

// The SMTP transport object. This is initialized to a nodemailer transport
// object while reading SMTP credentials, or to a dummy function in debug mode.
let gTransporter

const EmailTemplateType = {
  Notification: 'verification',
  Verification: 'notification'
}

async function initEmail (smtpUrl = AppConstants.SMTP_URL) {
  // Allow a debug mode that will log JSON instead of sending emails.
  if (!smtpUrl) {
    log.info('smtpUrl-empty', { message: 'EmailUtils will log a JSON response instead of sending emails.' })
    gTransporter = createTransport({ jsonTransport: true })
    return true
  }

  gTransporter = createTransport(smtpUrl)
  const gTransporterVerification = await gTransporter.verify()
  return gTransporterVerification
}

/**
 * Send Email
 * @param {string} recipient
 * @param {string} subject
 * @param {string} html
 * @returns <Promise>
 */
function sendEmail (recipient, subject, html) {
  if (!gTransporter) {
    return Promise.reject(new Error('SMTP transport not initialized'))
  }

  return new Promise((resolve, reject) => {
    const emailFrom = AppConstants.EMAIL_FROM
    const mailOptions = {
      from: emailFrom,
      to: recipient,
      subject,
      html,
      headers: {
        'x-ses-configuration-set': AppConstants.SES_CONFIG_SET
      }
    }

    gTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(new Error(error))
        return
      }
      if (gTransporter.transporter.name === 'JSONTransport') {
        log.info('JSONTransport', { message: info.message.toString() })
      }
      resolve(info)
    })
  })
}

function appendUtmParams (url, campaign, content) {
  const utmParameters = {
    utm_source: 'fx-monitor',
    utm_medium: 'email',
    utm_campaign: campaign,
    utm_content: content
  }
  for (const param in utmParameters) {
    url.searchParams.append(param, utmParameters[param])
  }
  return url
}

function getEmailCtaHref (emailType, content, subscriberId = null) {
  const subscriberParamPath = (subscriberId) ? `/?subscriber_id=${subscriberId}` : '/'
  const url = new URL(subscriberParamPath, AppConstants.SERVER_URL)
  return appendUtmParams(url, emailType, content)
}

function getVerificationUrl (subscriber) {
  if (!subscriber.verification_token) throw new Error('subscriber has no verification_token')
  let url = new URL(`${AppConstants.SERVER_URL}/api/v1/user/verify-email`)
  url = appendUtmParams(url, 'verified-subscribers', 'account-verification-email')
  url.searchParams.append('token', encodeURIComponent(subscriber.verification_token))
  return url
}

function getUnsubscribeUrl (subscriber, emailType) {
  // TODO: email unsubscribe is broken for most emails
  let url = new URL(`${AppConstants.SERVER_URL}/user/unsubscribe`)
  const token = (Object.prototype.hasOwnProperty.call(subscriber, 'verification_token')) ? subscriber.verification_token : subscriber.primary_verification_token
  const hash = (Object.prototype.hasOwnProperty.call(subscriber, 'sha1')) ? subscriber.sha1 : subscriber.primary_sha1
  url.searchParams.append('token', encodeURIComponent(token))
  url.searchParams.append('hash', encodeURIComponent(hash))
  url = appendUtmParams(url, 'unsubscribe', emailType)
  return url
}

function getMonthlyUnsubscribeUrl (subscriber, campaign, content) {
  // TODO: create new subscriptions section in settings to manage all emails and avoid one-off routes like this
  if (!subscriber.primary_verification_token) throw new Error('subscriber has no primary verification_token')
  let url = new URL('user/unsubscribe-monthly/', AppConstants.SERVER_URL)

  url = appendUtmParams(url, campaign, content)
  url.searchParams.append('token', encodeURIComponent(subscriber.primary_verification_token))

  return url
}

/**
 * Dummy data for populating the breach notification email preview
 *
 * @param {string} recipient
 * @returns {object} Breach dummy data
 */
const getNotifictionDummyData = (recipient) => ({
  breachAlert: {
    Id: 1,
    Name: 'Adobe',
    Title: 'Adobe',
    Domain: 'adobe.com',
    BreachDate: '2013-01-01T22:00:00.000Z',
    AddedDate: '2013-01-02T00:00:00.000Z',
    ModifiedDate: '2023-01-01T00:00:00.000Z',
    PwnCount: 123,
    Description: 'Example description',
    LogoPath: '/images/favicon-144.webp',
    DataClasses: [
      'email-addresses',
      'password-hints',
      'passwords',
      'usernames'
    ],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false
  },
  breachedEmail: recipient,
  ctaHref: '',
  heading: getMessage('email-spotted-new-breach'),
  recipientEmail: recipient,
  subscriberId: 123,
  supportedLocales: ['en'],
  unsubscribeUrl: '',
  utmCampaign: ''
})

/**
 * Dummy data for populating the email verification preview
 *
 * @param {string} recipient
 * @returns {object} Email verification dummy data
 */
const getVerificationDummyData = (recipient) => ({
  recipientEmail: recipient,
  ctaHref: '',
  utmCampaign: 'email_verify',
  unsubscribeUrl: '',
  heading: getMessage('email-verify-heading'),
  subheading: getMessage('email-verify-subhead')
})

export {
  EmailTemplateType,
  initEmail,
  sendEmail,
  getEmailCtaHref,
  getVerificationUrl,
  getUnsubscribeUrl,
  getMonthlyUnsubscribeUrl,
  getNotifictionDummyData,
  getVerificationDummyData
}
