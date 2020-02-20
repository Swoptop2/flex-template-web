import React, { useState, useEffect } from 'react';
import { StaticPage, TopbarContainer } from '..';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './ReportsPage.css';

// I need to have acces to current user in order to show buttons
const ReportsPage = ({ currentUser }) => {
  const [hideButtons, setHideButtons] = useState(true);
  const [disableUserBtn, setDisableUserBtn] = useState(false);
  const [disableListingBtn, setDisableListingBtn] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.attributes.email === process.env.REACT_APP_REPORTS_EMAIL) {
        setHideButtons(false);
      }
    }
  }, [currentUser]);

  const generateUserCsv = _ => {
    let users = [];
    var headers = {
      name: 'Name', // remove commas to avoid errors
      email: 'Email',
      state: 'State',
      city: 'City',
      school: 'School',
      sorority: 'Sorority',
      height: 'Height',
      allowstryOns: 'Allows Try Ons',
    };
    setDisableUserBtn(true);
    swal({
      title: 'Success!',
      text: 'Please wait while your file downloads',
      icon: 'success',
    });
    axios('/api/user-csv')
      .then(res => {
        users = res.data;
        exportCSVFile(headers, users, 'Swoptop Users');
      })
      .catch(err => {
        console.error(err);
        swal({
          title: 'Oops!',
          text: 'Something went wrong, please reload and try again',
          icon: 'error',
        });
      });
  };

  const generateListingCsv = _ => {
    let listings = [];
    var headers = {
      title: 'Title', // remove commas to avoid errors
      author: 'Author',
      createdAt: 'Created at',
      item: 'Item',
      brand: 'Brand',
      color: 'Color',
      damageCost: 'Damage Cost',
      fits: 'Fits',
      location: 'Location',
      retailPrice: 'Retail Price',
      size: 'Size',
      price: 'Price',
      listingId: 'Listing ID',
    };
    setDisableListingBtn(true);
    swal({
      title: 'Success!',
      text: 'Please wait while your file downloads',
      icon: 'success',
    });
    axios('/api/listing-csv')
      .then(res => {
        listings = res.data;
        const formattedListings = [];
        listings.forEach(lst => {
          formattedListings.push({
            title: lst.title.replace(/,/g, ''),
            author: lst.author.replace(/,/g, ''),
            createdAt: lst.createdAt,
            item: lst.item,
            brand: lst.brand.replace(/,/g, ''),
            color: lst.color,
            damageCost: lst.damageCost,
            fits: lst.fits,
            location: lst.location.replace(/,/g, ''),
            retailPrice: lst.retailPrice,
            size: lst.size,
            price: lst.price,
            listingId: lst.listingId,
          });
        });
        exportCSVFile(headers, formattedListings, 'Swoptop Listings');
      })
      .catch(err => {
        console.error(err);
        swal({
          title: 'Oops!',
          text: 'Something went wrong, please reload and try again',
          icon: 'error',
        });
      });
  };

  const convertToCSV = objArray => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      // eslint-disable-next-line
      for (let index in array[i]) {
        if (line !== '') line += ',';

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  };

  function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON
    const jsonObject = JSON.stringify(items);

    const csv = convertToCSV(jsonObject);

    const exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  return (
    <StaticPage
      className={css.root}
      title="Reports Page"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ReportsPage',
        description: 'Reports Page',
        name: 'Reports Page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>System Reports</h1>
            {hideButtons ? null : (
              <div className={css.buttons}>
                <button onClick={generateUserCsv} disabled={disableUserBtn} className={css.button}>
                  Generate User CSV
                </button>
                <button
                  onClick={generateListingCsv}
                  disabled={disableListingBtn}
                  className={css.button}
                >
                  Generate Listing CSV
                </button>
              </div>
            )}
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(ReportsPage);
