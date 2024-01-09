import {CardTransactions, Header} from "./IIsraTransactions";

// https://digital.isracard.co.il/services/ProxyRequestHandler.ashx?reqName=PirteyIska_204&moedChiuv=082023&inState=yes&shovarRatz=925588715

export interface IIsraDetailsResp {
    Header: Header
    PirteyIska_204Bean: IIsraDetails
}

export interface IIsraDetails extends CardTransactions {
    supplierId: any
    solek: string
    info: string
    voucherNumber: string
    supplierName: string
    dealType: string
    sector: string // category
    address: string
    moreInfo: any
    phoneNumber: string
    discount: string
    purchaseTime: string
    sumBeforeDiscount: string
    dealSum: string
    city: any
    paymentNumber: any
    numberOfPayments: any
    state: any
    interestSum: string
    interestPercentage: any
    sumOfCompensation: string
    sumOfValueAddedTax: string
    valueDate: string
    dateConversion: any
    currencyId: any
    sumDollar: any
    dollarTransferRate: any
    dollarTransferCommissionPercentage: any
    moneyWithdrawalCommission: any
    commissionDiscountPercentage: any
    commissionDiscountSum: any
    errorMessage: any
    isError: string[]
    saleName: any
    secondSaleName: any
    sumOfFund: string
    isInbound: string
    moed: string
    voucherNumberRatz: string
    chargeSum: string
    isShowPaymentsTable: any
    commissionNetValue: any
    commissionNetValueCurrency: any
    dealSumOutbound: any
    currencyIdOutbound: any
    dealSumOutboundInshekels: any
    currencyIdForCharge: any
    linking: string
    supplierNameIsracard: any
    purchaseDateOutboundIsracard: string
    canOrder: string
    dealCode: string
    selectedDate: any
    moedChiuvFull: string
    amlaDolarCa: any
    scumAmla: any
    dateConversionOutBound: any
    amlaDolarCaMatbea: any
    conversionDateZMD: any
    exchangeRateZMD: any
    motavName: string
    reasonOfTransaction: string
    dollarConversion: any
    conversionCurrency: any
    transactionType: string
    walletPayName: any
    websiteName: any
    chargeSumToDisplay: string
    clearingData: string
    horaatKevaDesc: any
    isThereData: any
    stage: any
    returnCode: any
    message: any
    returnMessage: any
    displayProperties: any
    tablePageNum: string
    isCaptcha: string
    isButton: string
    bcKey: any
    siteName: any
    requestNumber: any
}
