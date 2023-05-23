export interface CalResponse {
    result: Result
    statusDescription: string // הצלחה
    statusTitle: any // null
    statusCode: number // 1 - success
    groupPid: string //uuid
}

export interface Result {
    transArr: Transaction[]
    blockedCardInd: boolean
    bankAccounts: BankAccount[]
}

export interface Transaction {
    amountForDisplay: number // cost in shekels!
    amtBeforeConvAndIndex: number // cost original!
    branchCodeDesc: string | null // ! category (null)
    cardUniqueId?: string
    chargeExternalToCardComment: string
    comments: Comment[] //!
    curPaymentNum: number // usually 0
    currencyForDisplay?: string
    debCrdCurrencySymbol: string
    debCrdDate: string // date of debit from the bank
    discountAmount?: string // null
    discountReason?: string // null
    immediateComments: null | { comment: string }[] // null or []
    internationalBranchDesc?: string // ""
    internationalBranchID?: string // "5812" category id?
    isImmediate?: boolean
    isImmediateCommentInd: boolean
    isImmediateHHKInd: boolean
    isInterestTransaction?: boolean
    isMargaritaInd?: boolean
    isSpreadPaymenstAbroadInd?: boolean
    linkedComments: LinkedComment[] // []
    merchantAddress: string // ! address
    merchantName: string // ! name
    merchantPhoneNo: string // ! phone
    numOfPayments: number // ! number of payments (usually 0)
    onGoingTransactionsComment: string // ""
    refundInd: boolean
    roundingAmount: any
    roundingReason: any
    superBranchDesc: any
    tokenInd: number
    tokenNumberPart4: string
    transCardPresentInd: boolean
    transMahut: string
    transTypeCommentDetails: string[] // []
    transactionTypeCode: number // usually 5
    trnAmt: number // !cost
    trnCurrencyIsoCode: any
    trnCurrencySymbol: string // "₪"
    trnExacWay: number
    trnIntId: string
    trnNumaretor: number
    trnPurchaseDate: string // date "2023-04-11T15:10:51"
    trnType: string // רגילה
    walletProviderCode: number // 0 if not used, 3 - Apple Pay
    walletProviderDesc: string // "Apple Pay"

    trnTypeCode?: string
    cashAccountManager: any
    cashAccManagerName: any
    cashAccountTrnAmt?: number
    isMargarita?: boolean
    isSpreadPaymenstAbroad?: boolean
    debitSpreadInd?: boolean
}

export interface Comment {
    key: string // usually information about Apple Pay card number
    value: string // empty string
}

export interface LinkedComment {
    text: string
    linkDisplayName: string
    linkType: number
    link: string
}

export interface BankAccount {
    bankName: string
    bankAccountNum: string
    currentBankAccountInd: boolean
    debitDates: DebitDate[]
    immidiateDebits: ImmidiateDebits
    choiceExternalTransactions: any
}

export interface DebitDate {
    date: string
    fromPurchaseDate: string
    toPurchaseDate: string
    choiceHHKDebit: number
    debitReason: any
    totalBasketAmount: number
    basketAmountComment: any
    isChoiceRepaiment: boolean
    fixDebitAmount: number
    totalDebits: TotalDebit[]
    transactions: Transaction[]
}

export interface TotalDebit {
    currencySymbol: string
    amount: number
}

export interface ImmidiateDebits {
    totalDebits: any[]
    debitDays: any[]
}
