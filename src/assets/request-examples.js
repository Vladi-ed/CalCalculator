// MAX
// get SMS
fetch("https://www.max.co.il/api/login/otpLogin", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "cav": "V4.21-RC.7.30",
        "cid": "",
        "content-type": "application/json",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sid": "bc0b2b0d-e6fb-bfea-cf08-429b7a751e61",
        "urf": "/",
        "cookie": "_cls_v=739714f2-321d-4b38-905e-63343167251e; _cls_s=d051bb17-4e85-4379-8bfb-f5dc1da7cd20:0; dtCookie=v_4_srv_3_sn_A2AEDD0F33F9F3EED05A04A14BB69D18_perc_100000_ol_0_mul_1_app-3Aea7c4b59f27d43eb_1; NotAuthOnline40V3=zhss2vbitl1qued0jr2p5i1p; DeviceLanguage=en-US; CH40Request=53d3af60-97d9-4829-9e19-de6414d1ca36; ct2=t=9f460e00-4b81-4915-8926-d8aa6bc16f53",
        "Referer": "https://www.max.co.il/",
        "Referrer-Policy": "same-origin"
    },
    "body": "{\"id\":345250000}",
    "method": "POST"
});
// get sms (verifyCode): 51731

// Token:
// cOSadgCfHXSuCuKDlDLNXTlJ+43jPc4A6Jhhfg8Mqc2NNxRtyoOq1ZUi+pdEiJkodcUcXZh6HFDKLFKGwoelHc2kh+BHdfwY33zjGM2UkX3g6FxODO

// Verify Login
fetch("https://www.max.co.il/api/login/otpLoginVerify", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": "Bearer cOSadgCfHXSuCuKDlDLNXTlJ+43jPc4A6Jhhfg8Mqc2NNxRtyoOq1ZUi+pdEiJkodcUcXZh6HFDKLFKGwoelHc2kh+BHdfwY33zjGM2UkX3g6FxODO",
        "cache-control": "no-cache",
        "cav": "V4.21-RC.7.30",
        "cid": "",
        "content-type": "application/json",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sid": "bc0b2b0d-e6fb-bfea-cf08-429b7a751e61",
        "urf": "/",
        "cookie": "_cls_v=739714f2-321d-4b38-905e-63343167251e; _cls_s=d051bb17-4e85-4379-8bfb-f5dc1da7cd20:0; dtCookie=v_4_srv_3_sn_A2AEDD0F33F9F3EED05A04A14BB69D18_perc_100000_ol_0_mul_1_app-3Aea7c4b59f27d43eb_1; NotAuthOnline40V3=zhss2vbitl1qued0jr2p5i1p; DeviceLanguage=en-US; CH40Request=53d3af60-97d9-4829-9e19-de6414d1ca36; ct2=t=9f460e00-4b81-4915-8926-d8aa6bc16f53&it=2&i=X+dGVWcZ90LoTVLOORKUJdmNTicvp0ukWXeQjp9xAts=",
        "Referer": "https://www.max.co.il/",
        "Referrer-Policy": "same-origin"
    },
    "body": "{\"id\":345250000,\"card8Digits\":null,\"verifyCode\":\"51731\",\"accountNumber\":\"004250000\",\"isTypeIsCard8Digits\":false}",
    "method": "POST"
});

// Set-Cookie:
// BenefitDetailsV2=j84qbA4iaTv0%2fQaKk6R%2fZKR38qqlq1xxjmoAN%2f7jokW44NRFUN1%2fe1H2DFjy0qav6TfCF3C0yCS21MnLg906vwWwI7OfnPVR1OnacuE%2fPKZAtVdkWUCh8cSduO3rX4JX; domain=.max.co.il; expires=Tue, 09-Jan-2024 04:53:42 GMT; path=/; secure; HttpOnly
//
// Set-Cookie:
// OTPLoginV2=t0vUsPoJsaTlhZr7KunGPQ%3d%3d; domain=.max.co.il; expires=Sun, 08-Jan-2034 16:53:42 GMT; path=/; secure; HttpOnly

// Token:
// cOSadgCfHXSuCuKDlDLNXTlJ+43jPc4A6Jhhfg8Mqc2NNxRtyoOq1ZUi+pdEiJkodcUcXZh6HFDKLFKGwoelHc2kh+BHdfwY33zjGM2UkX3g6FxODO


fetch("https://www.max.co.il/api/registered/transactionDetails/getTransactionsAndGraphs?filterData={%22userIndex%22:-1,%22cardIndex%22:-1,%22monthView%22:false,%22date%22:%222023-06-30%22,%22dates%22:{%22startDate%22:%222023-05-06%22,%22endDate%22:%222023-06-09%22},%22bankAccount%22:{%22bankAccountIndex%22:-1,%22cards%22:null}}&firstCallCardIndex=-1null&v=V4.07-HF.19.36", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8,he;q=0.7",
        "cache-control": "no-cache",
        "cav": "V4.07-HF.19.36",
        "cid": "",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sid": "58b4344a-01de-44e9-3a9a-e2b5da0660c6",
        "urf": "/transaction-details/personal?filter=-1_-1_1_2023-06-01_0_0_-1&sort=1a_1a_1a_1a_1a_1a",
        "cookie": "_cls_v=f7585f7f-9e91-4fb5-aaaa-6b84c92e6cdb; _cls_s=68d9af6a-ba78-4714-aaaa-3bc601d6ef5f:0; dtCookie=v_4_srv_2_sn_EF7E6E93E615AC037B97547BBC7D3E7E_perc_100000_ol_0_mul_1_app-3Aea7c4b59f27d43eb_1; ELOQUA=GUID=812F3190EE0648918F96647E6C422990; _gid=GA1.3.996888808.1686337773; _tt_enable_cookie=1; _ttp=_PpcekQSBfKvp_6zb9sYOc_bxRA; _fbp=fb.2.1686337773326.1674199467; ln_or=eyIxMzA0NzA2IjoiZCJ9; ct1=c=eda961d0-53bb-bbbb-bd75-bc840d15f316&e=6/9/2025 10:09:38 PM; NotAuthOnline40V3=v5al5ghwumxmtq02um1wqwvc; ctFingerPrint=YhHV4yd1pbAR3MunFeDA; ct2=t=558fdbc6-59ad-4b46-b4ad-505037e25ead&it=2&i=X+dGVWcZ90LoTVLOORKUJdmNTicvp0ukWXeQjp9xAts=; ct3=pit=2&pi=X+dGVWcZ90LoTVLOORKUJdmNTicvp0ukWXeQjp9xAts=; .AUTHONLINE40V3=F46EC46C20835046428877F920AA443BFB883F4200D98D7D74EB44FA3332250924BEB711B1ED2C90E0878C6FF9B6ABF61F6E3908938FDB757A1E16E980DA1AC0DB5BA18E2CEACEDA7D9A098A; BenefitDetailsV2=j84qbA0iaTv0%2fQaKk6R%2fZKR38qqlq1xxjmoAN%2f7jokWu0cC5bsRpi%2bgFIAZqdUa3ieEJ%2fjSmiLekOfSXV7TaJj9l57Z31U%2byRoqbRTOWpOfmFIHTvIQWp5uaN2So4nhF; MarketingAgreementPopupCookie=Counter%3D1%3BLastShow%3DFri%2C%2009%20Jun%202023%2019%3A14%3A06%20GMT; CH40Request=ed0cea80-6e9b-4c63-bda3-88e6544b87be; rxVisitor=16863382151984Q15EIRJ9ERO0HUMHOV743H72FH0EI0N; _iidt=g+tf1fOtZd12dg7PsPwJIfjSgf9DInHDTxi1N7XtNHIjNxrEOAofRxHMEV0A1KFOetodSYeTR2HnFbxNqMG0vYrt7g==; _vid_t=/NbBKuu6cV3cT5lFrquL9rGQiRSU6OmHPzJCNACZMKJ+aIPpJD/0Klj7hrMYN0ZyGgYf3JRb/3FcuLfg+hP5rNicrA==; rxvt=1686340195950|1686338215201; dtPC=2$338391920_392h-vCWCBGFPVCWHRPCKLVRDIUCKLMDVBMVEH-0e0; dtLatC=1; dtSa=true%7CC%7C-1%7CYour%20letters%20and%20credit%20report%7C-%7C1686338402424%7C338391920_392%7Chttps%3A%2F%2Fonline.max.co.il%2FRegistred%2FUserSettings%2FUserSettings.aspx%3Fsource%3Dshowdigitalservices%7C%7C%7C%7C; WWW14052017=REG%7c%d7%9c%d7%a0%d7%a8%d7%94+%d7%90%d7%93%d7%9c%d7%a9%d7%98%d7%99%d7%99%d7%9f%7c09%2f06%2f2023+22%3a20%3a07; ctFingerPrintRequestId=1686337898443.KVJqNB; _ga=GA1.3.1103278421.1686337772; LegalMessage=true; _gat_UA-37498201-17=1; _ga_DM44CT4GBW=GS1.1.1686337772.1.1.1686338685.60.0.0",
        "Referer": "https://www.max.co.il/transaction-details/personal?filter=-1_-1_1_2023-06-01_0_0_-1&sort=1a_1a_1a_1a_1a_1a",
        "Referrer-Policy": "same-origin"
    },
    "method": "GET"
});


// IsraCard
// login with sms: 993428
fetch("https://digital.isracard.co.il/services/ProxyRequestHandler.ashx?reqName=ValidateLoginOtpNoReg", {
    "headers": {
        "__requestverificationtoken": "Ros597YWhO4oDJ-hoAhek73xCvGENBhgFTYBaqFrMJXxOE62Z92369mJRM4rG68TpUtaHItgrcv97WCgINDkIweV7sk1",
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "ASP.NET_SessionId=ccpvwrrbxwozpy00poiolpze; __RequestVerificationToken=AaYNK1GZzQ6GNEQOs82pov-h7KLhUDVM4RpRapJjsVbwXlrBqQOkZ0419lyufhcJIcFsOOhsmwp5pgBF8rEOyKabGKk1; authentication_shared=CfDJ8G_q3U9NPc5CsDRtexjFviksnSYKMymm9XUNR41tuL4WVih1aXbEbkgZeJM3Ltd4tcex9uvkiizvAyr8DimaxJjgKSRutgNFlK-ip4uUgIg0yPVGX4TzDMbq-KmClGB1vPgO1HzMIahXDNoNoiXJURvi4LWYti0HZz2GlqpZv0ewoBup0OP6gLLDg7gXNGQAy4EMU-UIls_bdiidckexdtQLs9eWb9hfjFZN8B58WDC-W1KhSwZMV7_qIKI6V6T-GZaR7vkg_olZT20obXZ4z0cr8RWjeoJZI_PeUih3g7cQyjrfm1CjVZJGNKPa2CuMFLDecisFji4f3PYrkG4gvPngArTVhfX7v3GPjsJ-kwFDWuKv8hjPDJsBu3mp3eLzmrizvGJ4JbAG4LkPVEZZ5LZ6rzqzL345wCobIHu1ydWtDy8LXSU3v9rObwj9FsHTnimL4ZdQLIPt6j1Vu5R5YRg; samesite=lax; TS01840992=010230978449d61fe149617884026b78232658dd5cb233fb28b30eb67c4a168cfd2e89cf3a3fc736e6d3b93d229c6c8636cdbe0115; TS0172b030=01023097841716202ff2750f5ab17df9cf3ec412bf32c61bc1e71326288c8f91b7f989345f8d3b591affc85f0f0f14fc988b877f1f; ValidateCaptcha=e2e99b1a-f522-4501-bb85-cfb37273239e; _firstName=%u05DC%u05D9%u05D5%u05D1%u05D5%u05D1; JSESSIONID=0000zvs4ct6_b4EjICldlG5_MSD:-1; TS01d175e7=0102309784b9bb1b0596c0e86d3b0e2de1f376d2092ed9f3a1b1b1fb7759e683aa00529e85c35fdde9c908f56fc11510f0fe332494; TS01b151ae=01023097848272756b68738b06da0ecb8e9d5015a7286e8612a20bfbec05db9ae8049b0cdc9d17e496d09a4054bdd76452d6db457b; TS01cba107=0102309784c9c42ef60e4c08b6de333d8de055d5cb5a4f5146f7a716e3dbc9368d3e580f0e364d85a73787e8420525ec0c44231795",
        "Referer": "https://digital.isracard.co.il/personalarea/Login/",
        "Referrer-Policy": "no-referrer-when-downgrade"
    },
    "body": "{\"cardSuffix\":\"220000\",\"id\":\"345000000\",\"idType\":\"1\",\"kodChevra\":\"11\",\"countryCode\":\"212\",\"otp\":\"993428\",\"isGoogleCaptcha\":true}",
    "method": "POST"
});
// return cookies

fetch("https://digital.isracard.co.il/services/ProxyRequestHandler.ashx?reqName=performLogonOtpNoReg", {
    "headers": {
        "__requestverificationtoken": "Ros597YWhO4oDJ-hoAhek73xCvGENBhgFTYBaqFrMJXxOE62Z92369mJRM4rG68TpUtaHItgrcv97WCgINDkIweV7sk1",
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "Referer": "https://digital.isracard.co.il/personalarea/Login/",
        "Referrer-Policy": "no-referrer-when-downgrade"
    },
    "body": "{\"MisparZihuy\":\"345000000\",\"idType\":\"1\",\"cardSuffix\":\"220000\",\"KodEretz\":\"212\",\"countryCode\":\"212\",\"isGoogleCaptcha\":true}",
    "method": "POST"
});

// this request returns new JSESSIONID: 0000_f45XZmQ-ktIKYN8S5SqQGq:-1

// get transaction list
// fetch("https://digital.isracard.co.il/services/ProxyRequestHandler.ashx?reqName=CardsTransactionsList&month=09&year=2023"

fetch("https://digital.isracard.co.il/services/ProxyRequestHandler.ashx?reqName=CardsTransactionsList&month=09&year=2023&cardIdx=0&requiredDate=N", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "ASP.NET_SessionId=ccpvwrrbxwozpy00poiolpqq; __RequestVerificationToken=AqYNK1GZzQ6GNEQOs82pov-h7KLhUDVM4RpRapJjsVbwXlrBqQOkZ0419lyufhcJIcFsOOhsmwp5pgBF8rEOyKabGKk1; samesite=lax; _firstName=%u05DC; JSESSIONID=0000_f45XZmQ-ktIKYN8S5SqQGq:-1; TS01840992=010230978418ec8e8cf69aaa08aq3d58d0a771cae6afeec2a62def36b89319addc5fd0fa27985d23de1db6324e6364324695657b1b; ValidateCaptcha=2fd9f6q5-b820-48a5-9fff-8940e4be31ee; _cls_v=324q2f4d-63dc-4481-b443-4f325021b135; _cls_s=e0d50q4d-5136-4fd6-aca6-6de0ccd0ab09:0",
        "Referer": "https://digital.isracard.co.il/personalarea/transaction-list/?requiredDate=K",
        "Referrer-Policy": "no-referrer-when-downgrade"
    },
    "method": "GET"
});

// get cards list
fetch("https://digital.isracard.co.il/services/ProxyRequestHandler.ashx?reqName=CardsList_102Digital&userGuid=NOSESSION_1708147703896", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "Referer": "https://digital.isracard.co.il/personalarea/transaction-list/?requiredDate=K",
        "Referrer-Policy": "no-referrer-when-downgrade"
    },
    "method": "GET"
});