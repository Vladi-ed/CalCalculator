export interface IsracardResponse {
    Header: Header
    CardsTransactionsListBean: CardsTransactionsListBean
}

export interface Header {
    Status: string | '1' | '-2'
    Message: null | string
}

export interface CardsTransactionsListBean {
    month: string
    year: string
    specificDate: any
    totalDebit: any
    cardIdx: string
    moed: string // need to provide
    payDay: string
    selectedDateIndex: string
    dateList: string[]
    totalChargeNis: string
    totalChargeDollar: any
    totalChargeEuro: any
    isShowDealsInboundForCharge: string
    isTooManyRecords: any
    isShowDealsInboundForInfo: string
    startDate: any
    endDate: any
    paymentSum: string
    paymentPercent: any
    Index0: Index0
    isCashBack: string
    currentDate: string
    cardNumberList: string[]
    selectedCardInfo: string
    userId: string
    cardNumberTail: string
    card6Digits: string
    selectedCardIndex: string
    card0: Card0[]
    isThereData: any
    stage: any
    returnCode: any
    message: any
    returnMessage: any
    displayProperties: string
    tablePageNum: string
    isError: string
    isCaptcha: string
    isButton: string
    bcKey: any
    siteName: any
    requestNumber: any
}

export interface Index0 {
    "@AllCards": string
    CurrentCardTransactions: CurrentCardTransaction[]
}

export interface CurrentCardTransaction {
    "@cardTransactions": string
    txnIsrael?: CardTransactions[]
    txnInfo: any
    txnAbroad?: CardTransactions[]
}

export interface CardTransactions {
    specificDate: any
    cardIndex: string
    dealsInbound: string
    supplierId: string
    supplierName: string
    dealSumType?: string
    paymentSumSign: any
    purchaseDate?: string
    fullPurchaseDate: string
    moreInfo: any
    horaatKeva: any
    voucherNumber?: string
    voucherNumberRatz: string // to request detailed data
    solek: string
    kodMatbeaMekori?: string
    purchaseDateOutbound: any
    fullPurchaseDateOutbound: any
    currencyId?: string
    currentPaymentCurrency: any
    city: any
    supplierNameOutbound: any
    fullSupplierNameOutbound: any
    paymentDate: any
    fullPaymentDate: any
    isShowDealsOutbound: any
    adendum: any
    voucherNumberRatzOutbound: any
    isShowLinkForSupplierDetails: string
    dealSum: string
    paymentSum: string
    fullSupplierNameHeb: string
    dealSumOutbound: any
    paymentSumOutbound: any
    isHoraatKeva: string
    stage: any
    returnCode: any
    message: any
    returnMessage: any
    displayProperties: any
    tablePageNum: string
    isError: string | string[]
    isCaptcha: string
    isButton: string
    bcKey: any
    siteName: any
    requestNumber: any
}

export interface Card0 {
    currentId: string
    holderName: any
    holderId: string
    totalNis: string
    totalDollar: any
    totalEuro: any
    stage: any
    returnCode: any
    message: any
    returnMessage: any
    displayProperties: any
    tablePageNum: string
    isError: string
    isCaptcha: string
    isButton: string
    bcKey: any
    siteName: any
    requestNumber: any
}
