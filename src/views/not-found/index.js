import React from 'react';
import Title from '../../components/title';
import Header from '../../components/header';
import Contact from '../../components/contact';

const NotFound = () => (
  <>
    <Title title="Page not found" />
    <Header text="Page not found" />

    <p className="govuk-body">If you typed the web address, check it is correct.</p>
    <p className="govuk-body">If you pasted the web address, check you copied the entire address.</p>
    <Contact text="If the web address is correct or you selected a link or button, contact us at" email="ahdabnasir@gmail.com" />
  </>
);

export default NotFound;
