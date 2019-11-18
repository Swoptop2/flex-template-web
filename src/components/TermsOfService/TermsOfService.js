import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';
import ExternalLink from '../ExternalLink/ExternalLink';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>

      <h2>Rights of Content</h2>
      <p>
      The users themselves retain the right to all text, pictures and other content that they create in the service. The users allow others to utilize the content in accordance with the nature of the service and furthermore allow the service provider to file information and data and make changes that are necessary for the service or the study, however other rights are not transferred from the users, unless specifically otherwise agreed. The responsibility of the content lies with the user, who has produced it to the service. The service provider has the right to remove or edit any material when it deems it necessary.
      </p>

      <h2>Disclaimer</h2>
      <p>
      No guarantees of the functioning of the service are given. The users are themselves responsible for their actions in the service and they should estimate the reliability of other users before dealing with them. The service provider can under no circumstances be liable for damage that is caused to the user. The user may not store any information or data in the service, and expect it to remain there. Users understand that pricing may be adjusted to meet the needs of the marketplace.
      </p>

      <h2>The Removal of a User</h2>
      <p>
      The service provider has the right to remove any users and terminate their right of use of the service without any specific reason and without being liable for compensation.
      </p>

      <h2>Applicable Jurisdiction
</h2>
<p>The jurisdiction that is applicable in this service and these terms of use is that of the United States & Finland, unless something else is required by binding law.</p>
<hr/>

<p>To view our terms in more detail, click <ExternalLink className={css.link} href="https://app.termly.io/document/privacy-policy/021431dd-8fd5-4420-bcdd-fe61f2d3dce5">here</ExternalLink></p>
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
