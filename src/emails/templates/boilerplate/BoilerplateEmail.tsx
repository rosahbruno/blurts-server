/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { SanitizedSubscriberRow } from "../../../app/functions/server/sanitize";
import { ExtendedReactLocalization } from "../../../app/hooks/l10n";

export type Props = {
  subscriber: SanitizedSubscriberRow;
  l10n: ExtendedReactLocalization;
};

/**
 * Minimal boilerplate for email templates
 *
 * This is an example of defining an email template. The markup syntax is
 * [MJML](https://mjml.io), generated by a React component that takes
 * dynamic user data as props. The back-end can then pass in the relevant data
 * and render it to a string before sending it to the user, using e.g.
 *
 * mjml2html(renderToStaticMarkup(<BoilerplateEmail subscriber={subscriber} />)).html
 *
 * Keep in mind that this means that the component is rendered just once, to
 * generate static MJML (which, in turn, is turned into HTML). In other words,
 * it does not execute in the browser, and cannot have state — so e.g. re-using
 * website components will not usually be possible.
 *
 * You can theoretically use server-side APIs, but then the template can't be
 * rendered in Storybook. Thus, it is recommended to call those beforehand, and
 * pass in the result as props — which can be replaced by mock data in
 * Storybook.
 *
 * @param props User data needed to render the email
 */
export const BoilerplateEmail = (props: Props) => {
  const l10n = props.l10n;

  return (
    <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>{l10n.getString("fluent-message-id")}</mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  );
};
