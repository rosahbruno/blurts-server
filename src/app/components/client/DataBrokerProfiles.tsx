/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use client";

import Image from "next/image";
import styles from "./DataBrokerProfiles.module.scss";
import { useL10n } from "../../hooks/l10n";
import IconChevronDown from "./assets/icon-chevron-down.svg";
import { useState } from "react";
import { OnerepScanResultRow } from "knex/types/tables";
import { DataBrokerNames } from "../../functions/universal/dataBrokerNames";

export type Props = {
  data: OnerepScanResultRow[];
};

function getDataBrokerName(dataBrokerName: string) {
  const result = DataBrokerNames.find(
    ({ data_broker }) => data_broker === dataBrokerName,
  );

  return result?.data_broker_pretty || dataBrokerName;
}

export const DataBrokerProfiles = (props: Props) => {
  const l10n = useL10n();
  const [showAllProfiles, setShowAllProfiles] = useState(false);

  return (
    <div className={styles.dataBrokerProfileCardsWapper}>
      <ul
        className={`${styles.dataBrokerProfileCards} ${
          showAllProfiles ? styles.showAll : ""
        }`}
      >
        {props.data.map((data) => (
          <li key={data.data_broker_id}>
            <DataBrokerProfileCard data={data} />
          </li>
        ))}
      </ul>
      <button
        className={`${styles.viewProfilesToggle} ${
          showAllProfiles ? styles.active : ""
        }`}
        onClick={() => setShowAllProfiles(!showAllProfiles)}
      >
        <span>
          {showAllProfiles
            ? l10n.getString(
                "fix-flow-data-broker-profiles-view-data-broker-profiles-button-view-less",
              )
            : l10n.getString(
                "fix-flow-data-broker-profiles-view-data-broker-profiles-button-view-more",
              )}
        </span>
        <Image alt="" src={IconChevronDown} />
      </button>
    </div>
  );
};

export type DataBrokerProfileCardProps = {
  data: OnerepScanResultRow;
};

export const DataBrokerProfileCard = (props: DataBrokerProfileCardProps) => {
  const l10n = useL10n();

  return (
    <div className={styles.dataBrokerProfileCard}>
      <span className={styles.dataBrokerName}>
        {getDataBrokerName(props.data.data_broker)}
      </span>

      <a href={props.data.link} target="_blank">
        {l10n.getString(
          "fix-flow-data-broker-profiles-view-data-broker-profiles-view-profile",
        )}
      </a>
    </div>
  );
};
