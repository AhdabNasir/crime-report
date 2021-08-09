import React from 'react';
import Title from '../../components/title';
import Header from '../../components/header';
import Contact from '../../components/contact';

const ServiceProblem = () => (
  <>
    <Title title="There is a problem" />
    <Header text="Sorry, there is a problem with the service" />

    <p className="govuk-body">Try again later.</p>
    <Contact text="If you need help while the system is down, please contact the helpdesk at" email="ahdabnasir@gmail.com" />
  </>
);

export default ServiceProblem;
