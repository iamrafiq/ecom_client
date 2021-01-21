import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { englishToBangla } from "../../util/utils";

import { getOrderList } from "../../user/apiUser";
import { selectUser, selectToken } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";


import ContactUs from "./ContactUs";
import FAQ from "./FAQ";
import TeamSowdamart from "./TeamSowdamart";
import Career from "./Career";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfUse from "./TermsOfUse";
import Footer from "./Footer";
// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import "./footer.css";
export default function FooterTabs({ match }) {
  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const history = useHistory();
  const [tabIndex, setTabIndex] = useState(-1);
  const [imageHeader, setImageHeader] = useState("");
  

  useEffect(() => {
    if (match.params.slug === "contact-us") {
      setTabIndex(0);
      setImageHeader("/images/privacy-policy.jpeg");
    } else if (match.params.slug === "faq") {
      setTabIndex(1);
      setImageHeader("/images/privacy-policy.jpeg");
    } else if (match.params.slug === "team-sowdamart") {
      setTabIndex(2);
      setImageHeader("/images/privacy-policy.jpeg");
    } else if (match.params.slug === "career") {
      setTabIndex(3);
      setImageHeader("/images/career.jpeg");
    } else if (match.params.slug === "privacy-policy") {
      setTabIndex(4);
      setImageHeader("/images/privacy-policy.jpeg");
    } else if (match.params.slug === "terms-of-use") {
      setTabIndex(5);
      setImageHeader("/images/terms_of_use.png");
    }
  }, [match.params.slug]);

  const onSelectTab = (index) => {
    if (index === 0) {
      history.push({
        pathname: `/ft/contact-us`,
      });
    } else if (index === 1) {
      history.push({
        pathname: `/ft/faq`,
      });
    } else if (index === 2) {
      history.push({
        pathname: `/ft/team-sowdamart`,
      });
    } else if (index === 3) {
      history.push({
        pathname: `/ft/career`,
      });
    } else if (index === 4) {
      history.push({
        pathname: `/ft/privacy-policy`,
      });
    } else if (index === 5) {
      history.push({
        pathname: `/ft/terms-of-use`,
      });
    }
  };
  return (
    <React.Fragment>
      <div className="footer-screen">
        <img src={`/images/footer-header.jpeg`} alt="Sowdamart" />

        {tabIndex > -1 && (
          <div className="footer-screen-tabs">
            <Tabs
              defaultIndex={tabIndex}
              onSelect={(index) => onSelectTab(index)}
            >
              <TabList>
                <Tab>{language === "en" ? `Contact Us` : `যোগাযোগ`}</Tab>
                <Tab>
                  {language === "en" ? `FAQ` : `প্রতিনিয়ত জিজ্ঞাসিত প্রশ্ন`}
                </Tab>
                <Tab>
                  {language === "en" ? `Team Sowdamart` : `টিম সওদামার্ট`}
                </Tab>
                <Tab>{language === "en" ? `Career` : `ক্যারিয়ার`}</Tab>
                <Tab>
                  {language === "en" ? `Privacy Policy` : `গোপনীয়তা নীতি`}
                </Tab>
                <Tab>
                  {language === "en" ? `Terms of Use` : `ব্যবহারের নিয়মাবলি`}
                </Tab>
                {/* <Tab>{language === "en" ? `Corporate` : `কর্পোরেট`}</Tab> */}
              </TabList>

              <TabPanel><ContactUs></ContactUs></TabPanel>
              <TabPanel><FAQ></FAQ></TabPanel>
              <TabPanel><TeamSowdamart></TeamSowdamart></TabPanel>
              <TabPanel><Career></Career></TabPanel>
              <TabPanel><PrivacyPolicy></PrivacyPolicy></TabPanel>
              <TabPanel><TermsOfUse></TermsOfUse></TabPanel>

            </Tabs>
          </div>
        )}
      </div>

      <Footer></Footer>
    </React.Fragment>
  );
}
