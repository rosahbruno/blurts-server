/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { SubscriberRow } from "knex/types/tables";
import { resetUnverifiedEmailAddress } from "../../../db/tables/emailAddresses";
import { sendEmail } from "../../../utils/email";
import { renderEmail } from "../../../emails/renderEmail";
import { VerifyEmailAddressEmail } from "../../../emails/templates/verifyEmailAddress/VerifyEmailAddressEmail";
import { sanitizeSubscriberRow } from "../../functions/server/sanitize";
import { getL10n } from "../../functions/l10n/serverComponents";
import { BadRequestError } from "../../../utils/error";
import { captureException } from "@sentry/node";
import crypto from "crypto";
import { addEmailPreferenceForSubscriber } from "../../../db/tables/subscriber_email_preferences";
import { SerializedSubscriber } from "../../../next-auth.js";

export async function sendVerificationEmail(
  user: SubscriberRow,
  emailId: number,
) {
  const sanitizedSubscriber = sanitizeSubscriberRow(user);
  const l10n = getL10n(sanitizedSubscriber.signup_language ?? undefined);
  const unverifiedEmailAddressRecord = await resetUnverifiedEmailAddress(
    emailId,
    user,
    l10n,
  );
  const recipientEmail = unverifiedEmailAddressRecord.email;

  if (!unverifiedEmailAddressRecord.verification_token) {
    throw new BadRequestError("subscriber has no verification_token");
  }

  const utmCampaign = "verified-subscribers";
  const verificationUrl = new URL(
    `${process.env.SERVER_URL}/api/v1/user/verify-email`,
  );
  verificationUrl.searchParams.set(
    "token",
    unverifiedEmailAddressRecord.verification_token,
  );
  verificationUrl.searchParams.set("utm_campaign", utmCampaign);
  verificationUrl.searchParams.set("utm_content", "account-verification-email");
  verificationUrl.searchParams.set("utm_source", "fx-monitor");
  verificationUrl.searchParams.set("utm_medium", "email");

  await sendEmail(
    recipientEmail,
    l10n.getString("email-subject-verify"),
    renderEmail(
      <VerifyEmailAddressEmail
        verificationUrl={verificationUrl.href}
        subscriber={sanitizedSubscriber}
        l10n={l10n}
        utmCampaignId={utmCampaign}
      />,
    ),
  );
}

export async function generateUnsubscribeLinkForSubscriber(
  subscriber: SerializedSubscriber,
) {
  try {
    const unsubToken = randomString();
    const sub = await addEmailPreferenceForSubscriber(
      subscriber.id,
      {
        unsubscribe_token: unsubToken,
      },
      ["unsubscribe_token"],
    );
    return `${process.env.SERVER_URL}/unsubscribe-email/monthly-report-free?token=${sub.unsubscribe_token}`;
  } catch (e) {
    console.error("generate_unsubscribe_link", {
      exception: e as string,
    });
    captureException(e);
    return null;
  }
}

function randomString(length: number = 64) {
  return crypto.randomBytes(length).toString("hex");
}
