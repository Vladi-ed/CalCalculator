export const onRequestGet = async ({ request }) => {
  return fetch("https://services.cal-online.co.il/Card-Holders/SCREENS/Transactions/Transactions.aspx", {
    "headers": {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/x-www-form-urlencoded",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      "Pragma": "no-cache",
      "Cache-Control": "no-cache",
      "Host": "services.cal-online.co.il",
      "Origin": "https://services.cal-online.co.il",
      "referrer": "https://services.cal-online.co.il/Card-Holders/SCREENS/Transactions/Transactions.aspx",
      // "Cookie": "TS0106b88d=01adfa601566b06c7ad81050b4ec85417668d6714fd64a7580d9c2b38a699ae1c87bd14197fb4253630dc3492d280a97fc8ff27aff8a3753c445748db565fe7c4a2e204e23c86fa46a388e2c5416fc986bb26e9890b5abf37023a86102992fb1f349d129227a7ead5007049794d561ed9a201282327b25e8154b319112d9c19db89e754ff8; ASP.NET_SessionId=giz2mjd25bguol3spjfmfibv; WSD_COOK=COL-PRDWEB06; BIGipServerCard-Holders-2012=1914838700.20480.0000; CalLoggedIn=1; .ASPXAUTH=41C542198D26AB83CC4B959A864ABD664BB703F445F686AD427AC24FB26812799BACBDBF5535FE3A34F2B5544803CA57092B78B3CADFBFF430DCBBF81137FE818689E5E27817A67E70A8A0FB9FDA2D0D33450444B04EE5F010836A1B7D2439B16FCEDE5A8BD6B1E5A0A940A8273ED560"
    },
    "body": "PrintTransDetailsRequest=&__TRANS_DETAILS_PAGE_NAME=TransDetails.aspx&hidToggleFormLink=AdvancedSearchOpen&__EVENTTARGET=&__EVENTARGUMENT=&__TRANS_SOURCE_NAME=Transactions&ctl00_FormAreaNoBorder_FormArea_clndrDebitDateScope_ItemsState=%2FwEQDxYCHgtfIURhdGFCb3VuZGdkDxYTZgIBAgICAwIEAgUCBgIHAggCCQIKAgsCDAINAg4CDwIQAhECEhYTEAUHMTAvMjAyMQUHMTAvMjAyMWcQBQcxMS8yMDIxBQcxMS8yMDIxZxAFBzEyLzIwMjEFBzEyLzIwMjFnEAUHMDEvMjAyMgUHMDEvMjAyMmcQBQcwMi8yMDIyBQcwMi8yMDIyZxAFBzAzLzIwMjIFBzAzLzIwMjJnEAUHMDQvMjAyMgUHMDQvMjAyMmcQBQcwNS8yMDIyBQcwNS8yMDIyZxAFBzA2LzIwMjIFBzA2LzIwMjJnEAUHMDcvMjAyMgUHMDcvMjAyMmcQBQcwOC8yMDIyBQcwOC8yMDIyZxAFBzA5LzIwMjIFBzA5LzIwMjJnEAUHMTAvMjAyMgUHMTAvMjAyMmcQBQcxMS8yMDIyBQcxMS8yMDIyZxAFBzEyLzIwMjIFBzEyLzIwMjJnEAUHMDEvMjAyMwUHMDEvMjAyM2cQBQcwMi8yMDIzBQcwMi8yMDIzZxAFBzAzLzIwMjMFBzAzLzIwMjNnEAUHMDQvMjAyMwUHMDQvMjAyM2cWAQIS&ctl00_FormAreaNoBorder_FormArea_ctlDateScopeStart_ctlMonthYearList_ItemsState=%2FwEQDxYCHgtfIURhdGFCb3VuZGdkEBUUBzA5LzIwMjEHMTAvMjAyMQcxMS8yMDIxBzEyLzIwMjEHMDEvMjAyMgcwMi8yMDIyBzAzLzIwMjIHMDQvMjAyMgcwNS8yMDIyBzA2LzIwMjIHMDcvMjAyMgcwOC8yMDIyBzA5LzIwMjIHMTAvMjAyMgcxMS8yMDIyBzEyLzIwMjIHMDEvMjAyMwcwMi8yMDIzBzAzLzIwMjMHMDQvMjAyMxUUBzA5LzIwMjEHMTAvMjAyMQcxMS8yMDIxBzEyLzIwMjEHMDEvMjAyMgcwMi8yMDIyBzAzLzIwMjIHMDQvMjAyMgcwNS8yMDIyBzA2LzIwMjIHMDcvMjAyMgcwOC8yMDIyBzA5LzIwMjIHMTAvMjAyMgcxMS8yMDIyBzEyLzIwMjIHMDEvMjAyMwcwMi8yMDIzBzAzLzIwMjMHMDQvMjAyMxQrAxRnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZxYBAhA%3D&ctl00_FormAreaNoBorder_FormArea_ctlDateScopeStart_ctlDaysList_ItemsState=%2FwEQDxYCHgtfIURhdGFCb3VuZGdkEBUfATEBMgEzATQBNQE2ATcBOAE5AjEwAjExAjEyAjEzAjE0AjE1AjE2AjE3AjE4AjE5AjIwAjIxAjIyAjIzAjI0AjI1AjI2AjI3AjI4AjI5AjMwAjMxFR8BMQEyATMBNAE1ATYBNwE4ATkCMTACMTECMTICMTMCMTQCMTUCMTYCMTcCMTgCMTkCMjACMjECMjICMjMCMjQCMjUCMjYCMjcCMjgCMjkCMzACMzEUKwMfZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZxYBAg4%3D&ctl00_FormAreaNoBorder_FormArea_ctlDateScopeEnd_ctlMonthYearList_ItemsState=%2FwEQDxYCHgtfIURhdGFCb3VuZGdkEBUUBzA5LzIwMjEHMTAvMjAyMQcxMS8yMDIxBzEyLzIwMjEHMDEvMjAyMgcwMi8yMDIyBzAzLzIwMjIHMDQvMjAyMgcwNS8yMDIyBzA2LzIwMjIHMDcvMjAyMgcwOC8yMDIyBzA5LzIwMjIHMTAvMjAyMgcxMS8yMDIyBzEyLzIwMjIHMDEvMjAyMwcwMi8yMDIzBzAzLzIwMjMHMDQvMjAyMxUUBzA5LzIwMjEHMTAvMjAyMQcxMS8yMDIxBzEyLzIwMjEHMDEvMjAyMgcwMi8yMDIyBzAzLzIwMjIHMDQvMjAyMgcwNS8yMDIyBzA2LzIwMjIHMDcvMjAyMgcwOC8yMDIyBzA5LzIwMjIHMTAvMjAyMgcxMS8yMDIyBzEyLzIwMjIHMDEvMjAyMwcwMi8yMDIzBzAzLzIwMjMHMDQvMjAyMxQrAxRnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZxYBAhM%3D&ctl00_FormAreaNoBorder_FormArea_ctlDateScopeEnd_ctlDaysList_ItemsState=%2FwEQDxYCHgtfIURhdGFCb3VuZGdkEBUfATEBMgEzATQBNQE2ATcBOAE5AjEwAjExAjEyAjEzAjE0AjE1AjE2AjE3AjE4AjE5AjIwAjIxAjIyAjIzAjI0AjI1AjI2AjI3AjI4AjI5AjMwAjMxFR8BMQEyATMBNAE1ATYBNwE4ATkCMTACMTECMTICMTMCMTQCMTUCMTYCMTcCMTgCMTkCMjACMjECMjICMjMCMjQCMjUCMjYCMjcCMjgCMjkCMzACMzEUKwMfZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZxYBAg4%3D&__VIEWSTATE=&cmbTransType_HiddenField=0&cmbTransOrigin_HiddenField=+&cmbPayWallet_HiddenField=0&cmbTransAggregation_HiddenField=0&__PREVIOUSPAGE=GxS0aGpfOzdOBu1Q5CsKurHDGwSI1Il-vRZZOUm5GAanIXvc9-wpNrW14O4d105RD44SFx71Mr70lDBcOslMEdLBVo9hxGQXrRgzujpeBM4-ra-_afpa4K1AXi2mFAMuA33kg34o94ezhxxd98ZyXg2&__EVENTVALIDATION=fefrQCPpouOBMtZawadCl%2BTpEowf1Qxkb16x5ciZ%2FsPVDe%2BihM6Ct7OeK7zMkXCSbMXV72md4ypPcktu%2BxycxkUgHgdhDDIDhLIsGKiIP5jbj%2B6nf%2FJ58C%2FsV%2B9xxLv5fpvBuwJdltGDec6c9KhTgd14MHSl3otX7rgGkYTk1NxsW%2Fk8KlgX%2FQoVay6SXmEGj0U9awWh%2BdrT9OJkXneUWta7juCRSFW00pCcP77SLifKXdEuLDzRUF1vn%2BjM4h1LqtKOgkgx000EcVMKXSNqJYQJ3g2O29bRxcStJO65kdap5CEhBbT8H%2FBht8Feo9VF%2BgxgeP3yV%2FoJ1ekUBrPTPgtzUJdpHJUCe4OHFkPq%2BTqTrg1XeV7qTWNrkgfPzTQQRPaoURn2BUE98wf%2FdutBTPhj1vSJJ3Xhlvkfb7w%2FysK68BVl8r5Z15dSN5cN8SmuF6BKb2q7QRgwi3bh7YfB0rnpvpniC2v7Z%2FXRtgvLJH%2BUMCRYI5%2BIiO9scbUHVQcp1bDn2S%2Bmpwwb2RRTiTyoTNeqIRAXcSdJGbfI%2FtG5%2BOevIAWIsirMsFzLB6zAkQKC7M576crsADUoB%2BAHOZ52sjsCxVhYufdVoEpWIojaWm6pXgIU2ogdZKiaqBIzsOneJNeo3lB0X95veQZ1E8XQUo%2BtuwRwIw8qq1qsTvgn2MNMHNqR9amfi4FEgotmOmtivvR6WE1ZZpXRP3XYBhR55z1MsH6meTHQIEeGSCAMvkHdcNtB0dQ0gASJC3grULxDKBSSHNqtATjShQ00OfEK114g6oEqJhBj8gD9r2Q9gOUAcya%2BHddceMyz%2FH3%2BH8ZQ%2BKjtg5I9QQDcZfzZx9Z%2FKnbujQR3RABnlgnjOA4EUf2A9t%2FqrpWnhyy09xrkGZ5HbwDIzhd1jaE6bUA%2Fj4ZJel%2Fm7wF5eshxgXHHKz0Bq9dZutJ5waRttVHQ7QA6hd0GnXptJecA1xYqVjLqcqfkTg%3D%3D&GUID=&ReturnToUrl=&From=&ctl00%24ContentTop%24cboCardList%24categoryList%24__categoryListSelectedValue=%7B%22group%22%3A%221%22%2C%22value%22%3A%2211795005242020202%22%7D&ctl00%24ContentTop%24cboCardList%24categoryList%24lblCollapse=%E2%80%8F+%D7%95%D7%9C%D7%93%D7%99%D7%9E%D7%99%D7%A8+%D7%90%D7%93%D7%9C%D7%A9%D7%98%D7%99%D7%99%D7%9F%E2%80%8F+%28%D7%95%D7%99%D7%96%D7%94%E2%80%8F+%E2%80%8F%E2%80%8F%E2%80%8F%E2%80%8F%E2%80%8F%D7%96%D7%94%D7%91%E2%80%8F%E2%80%8F%29%E2%80%8F+-+9500+&ctl00%24ContentTop%24cboCardList%24categoryList%24outerRep%24ctl00%24innerRep%24ctl00%24hfUniqueId=11795005242020202&ctl00%24FormAreaNoBorder%24FormArea%24clndrDebitDateScope%24TextBox=04%2F2023&ctl00%24FormAreaNoBorder%24FormArea%24clndrDebitDateScope%24HiddenField=18&ctl00%24FormAreaNoBorder%24FormArea%24rdogrpTransactionType=rdoTransactionDate&ctl00%24FormAreaNoBorder%24FormArea%24ctlDateScopeStart%24ctlMonthYearList%24TextBox=01%2F2023&ctl00%24FormAreaNoBorder%24FormArea%24ctlDateScopeStart%24ctlMonthYearList%24HiddenField=16&ctl00%24FormAreaNoBorder%24FormArea%24ctlDateScopeStart%24ctlDaysList%24TextBox=15&ctl00%24FormAreaNoBorder%24FormArea%24ctlDateScopeStart%24ctlDaysList%24HiddenField=14&ctl00%24FormAreaNoBorder%24FormArea%24ctlDateScopeEnd%24ctlMonthYearList%24TextBox=04%2F2023&ctl00%24FormAreaNoBorder%24FormArea%24ctlDateScopeEnd%24ctlMonthYearList%24HiddenField=19&ctl00%24FormAreaNoBorder%24FormArea%24ctlDateScopeEnd%24ctlDaysList%24TextBox=15&ctl00%24FormAreaNoBorder%24FormArea%24ctlDateScopeEnd%24ctlDaysList%24HiddenField=14&cmbTransType=%D7%94%D7%9B%D7%9C&cmbTransOrigin=%D7%94%D7%9B%D7%9C&cmbPayWallet=%D7%9B%D7%9C+%D7%94%D7%A2%D7%A1%D7%A7%D7%90%D7%95%D7%AA&cmbTransAggregation=%D7%9C%D7%9C%D7%90+%D7%A7%D7%99%D7%91%D7%95%D7%A5&ctl00%24FormAreaNoBorder%24FormArea%24ctlMainToolBar%24btnExcel.x=16&ctl00%24FormAreaNoBorder%24FormArea%24ctlMainToolBar%24btnExcel.y=11&ctl00%24__MATRIX_VIEWSTATE=2",
    "method": "POST"
  });
}