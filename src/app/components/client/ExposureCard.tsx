/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use client";

import React, { ReactElement, useEffect, useState } from "react";
import styles from "./ExposureCard.module.scss";
import { StatusPill } from "../server/StatusPill";
import { StaticImageData } from "next/image";
import {
  ChevronDown,
  EmailIcon,
  LocationPin,
  MultipleUsers,
  OpenInNew,
  PhoneIcon,
} from "../server/Icons";
import Image from "next/image";
import { Button } from "../server/Button";

export type Props = {
  exposureImg: StaticImageData;
  exposureName: string;
  exposureType: string;
  exposureDetailsLink: string;
  dateFound: string;
  statusPillType: string;
  statusPillContent: string;
};

type DetailsFoundProps = {
  whichExposed: string; // family | email | phone | address
  num: number;
  icon: ReactElement;
};

export const ExposureCard = (props: Props) => {
  const {
    exposureImg,
    exposureName,
    exposureType,
    exposureDetailsLink,
    dateFound,
    statusPillContent,
    statusPillType,
  } = props;

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // $screen-md
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const DetailsFoundItem = (props: DetailsFoundProps) => {
    let headline, description;
    if (props.whichExposed === "family") {
      headline = "Family members";
      description = `${props.num} found`;
    }
    if (props.whichExposed === "email") {
      headline = "Email";
      description = `${props.num} found`;
    }

    if (props.whichExposed === "phone") {
      headline = "Phone number";
      description = `${props.num} found`;
    }

    if (props.whichExposed === "address") {
      headline = "Address";
      description = `${props.num} found`;
    }

    return (
      <dl className={styles.detailsFoundItem}>
        <dt>
          <span className={styles.exposureTypeIcon}>{props.icon}</span>
          {headline}
        </dt>
        <dl>{description}</dl>
      </dl>
    );
  };
  const elementCard = (
    <div>
      <div className={styles.exposureCard}>
        <div className={styles.exposureHeader}>
          <ul className={styles.exposureHeaderList}>
            {!isMobile ? <li className={`${styles.exposureImageWrapper} ${styles.hideOnMobile}`}>
              <Image
                className={styles.exposureImage}
                alt=""
                src={exposureImg}
              /> </li>: ""}
            <li>{exposureName}</li>
            {!isMobile ? <li>{exposureType}</li> : ""}
            {!isMobile ? <li>{dateFound}</li> : ""}
            <li>
              <StatusPill type={statusPillType} content={statusPillContent} />
            </li>
          </ul>
          <span
            className={styles.chevronDown}
            onClick={() => setDetailsOpen(!detailsOpen)}
          >
            <ChevronDown
              className={detailsOpen ? styles.isOpen : ""}
              alt=""
              width="20"
              height="20"
            />
          </span>
        </div>
        <div
          className={`${styles.exposureDetailsSection} ${
            detailsOpen ? styles.isOpen : ""
          }`}
        >
          <p>
            This site is selling and publishing {" "}
            <a href={exposureDetailsLink}>
              details about you.
              <span>
                <OpenInNew alt="" width="13" height="13" />
              </span>
            </a>
            {" "}
            Remove this profile to protect your privacy.
          </p>
          <div className={styles.exposureListOfExposureTypes}>
            <ul>
              <li>Your exposed info:</li>
              <li>
                <DetailsFoundItem
                  icon={<MultipleUsers alt="" width="13" height="13" />}
                  whichExposed="family"
                  num={0}
                />
              </li>
              <li>
                <DetailsFoundItem
                  icon={<PhoneIcon alt="" width="13" height="13" />}
                  whichExposed="phone"
                  num={5}
                />
              </li>
              <li>
                <DetailsFoundItem
                  icon={<EmailIcon alt="" width="13" height="13" />}
                  whichExposed="email"
                  num={4}
                />
              </li>
              <li>
                <DetailsFoundItem
                  icon={<LocationPin alt="" width="13" height="13" />}
                  whichExposed="address"
                  num={0}
                />
              </li>
            </ul>
            <span className={styles.fixItBtn}>
              <Button type={"primary"} content={"Lets fix it"} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return elementCard;
};


