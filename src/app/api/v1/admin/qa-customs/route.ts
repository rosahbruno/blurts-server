/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "../../../../functions/server/getServerSession";
import {
  createQaTogglesRow,
  setQaToggle,
} from "../../../../../db/tables/qa_customs";
import { isAdmin } from "../../../utils/auth";
import { unauthError } from "../../../utils/errorThrower";

export async function POST() {
  const session = await getServerSession();
  if (!isAdmin(session?.user.email || "")) return unauthError();

  const emailSha1 = session?.user.subscriber?.primary_email;
  const subscriberId = session?.user.subscriber?.id;
  if (!emailSha1 || !subscriberId) {
    return NextResponse.json(
      { error: "Either email or subscriber id seems to be missing" },
      { status: 400 },
    );
  }
  await createQaTogglesRow(emailSha1, subscriberId);

  return NextResponse.json({ error: "QaToggles row created" }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession();
  if (!isAdmin(session?.user.email || "")) return unauthError();

  const emailHash = session?.user.subscriber?.primary_sha1;
  if (!emailHash)
    return NextResponse.json(
      { error: "Email hash is absent" },
      { status: 400 },
    );

  const emailHashPrefix = emailHash.slice(0, 6);

  const columnName = req.nextUrl.searchParams.get("columnName");
  const isVisible = req.nextUrl.searchParams.get("isVisible");
  if (!columnName || !isVisible)
    return NextResponse.json(
      { error: "Column name or isVisible value is missing" },
      { status: 400 },
    );
  const toggle = isVisible === "false" ? false : true;

  await setQaToggle(columnName, toggle, emailHashPrefix);

  return NextResponse.json(
    { error: `${columnName} toggled to ${toggle}` },
    { status: 200 },
  );
}
