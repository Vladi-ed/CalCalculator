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
    amountForDisplay?: number // Cost in shekels!
    // This is the cost of the transaction, displayed to the user.
    // It may be different from the actual cost of the transaction,
    // for example if there was a discount.

    amtBeforeConvAndIndex: number // cost original!
    // This is the original cost of the transaction, before any currency conversion or rounding.

    branchCodeDesc: string | null // ! categoryHeb (null)
    // This is the branch code of the merchant where the transaction took place.

    cardUniqueId?: string
    // This is the unique identifier of the card used for the transaction.
    // It can be used to track transactions across multiple accounts.

    chargeExternalToCardComment: string
    // This is a comment that is associated with the transaction.
    // It can be used to provide additional information about the transaction,
    // such as the reason for the transaction or the merchant's name.

    comments?: Comment[] //!
    // This is an array of comments that are associated with the transaction.
    // Comments can be added by the user or by the system.

    curPaymentNum: number // usually 0
    // Current payment number for recurring transactions.

    currencyForDisplay?: string
    // This is the currency in which the transaction amount is displayed to the user.
    // It may be different from the currency in which the transaction was actually made,
    // for example if there was a currency conversion.

    debCrdCurrencySymbol: string
    // This is the symbol of the currency in which the transaction was made.

    debCrdDate: string // date of debit from the bank
    // This is the date on which the transaction was debited from the user's account.

    discountAmount?: string // null
    // This is the amount of the discount applied to the transaction.

    discountReason?: string // null
    // This is the reason for the discount.

    immediateComments: null | { comment: string }[] // null or []
    // This is an array of comments that are associated with an immediate transaction.
    // Immediate transactions are transactions that are processed immediately,
    // without the need for authorization.

    internationalBranchDesc?: string // ""
    // This is the description of the international branch where the transaction took place.

    internationalBranchID?: string // "5812" categoryHeb id?
    // This is the ID of the international branch where the transaction took place.

    isImmediate?: boolean
    // This is a boolean value that indicates whether the transaction was immediate.
    // Immediate transactions are processed immediately,
    // without the need for authorization.

    isImmediateCommentInd: boolean
    // This is a boolean value that indicates whether there is a comment associated with the immediate transaction.

    isImmediateHHKInd: boolean
    // This is a boolean value that indicates whether the transaction was made using the HHK payment system.

    isInterestTransaction?: boolean
    // This is a boolean value that indicates whether the transaction is an interest transaction.
    // Interest transactions are transactions that generate interest, such as credit card purchases.

    isMargaritaInd?: boolean
    // This is a boolean value that indicates whether the transaction is a Margarita transaction.
    // Margarita transactions are transactions that are eligible for a Margarita discount.

    isSpreadPaymenstAbroadInd?: boolean
    // This is a boolean value that indicates whether the transaction is a spread payment abroad transaction.
    // Spread payment abroad transactions are transactions that are made in a foreign currency and then converted to the user's local currency.

    linkedComments: LinkedComment[] // []
    // This is an array of linked comments that are associated with the transaction.
    // Linked comments are comments that are associated with other transactions.

    merchantAddress: string // ! address
    // This is the address of the merchant where the transaction took place.

    merchantName: string // ! name/description
    // This is the name of the merchant where the transaction took place.

    merchantPhoneNo: string // ! phone
    // This is the phone number of the merchant where the transaction took place.

    numOfPayments: number // ! number of payments (usually 0)
    // Total number of payments the recurring transaction.

    onGoingTransactionsComment: string // ""
    // This is a comment for recurring payment

    refundInd: boolean
    // This is a boolean value that indicates whether the transaction was a refund.

    roundingAmount: any
    // This is the amount of rounding that was applied to the transaction.

    roundingReason: any
    // This is the reason for the rounding.

    superBranchDesc: any
    // This is the description of the super branch where the transaction took place.

    tokenInd: number
    // 0 - direct payment, 1 - using 'virtual' wallet method (Apple Pay /Google pay)

    tokenNumberPart4: string
    // Last 4 digits of 'virtual' wallet (Apple Pay /Google pay)

    transCardPresentInd: boolean
    // This is a boolean value that indicates whether the card was present when the transaction was made.

    transMahut: string
    // This is the mahut of the transaction.

    transTypeCommentDetails: string[] // []
    // This is an array of comments that are associated with the transaction type.
    // Comments can be added by the user or by the system.

    transactionTypeCode: number // usually 5
    // This is the code of the transaction type.

    trnAmt: number; // ! Cost summary.
    // This is the cost of the transaction, without splitting by payments.

    trnCurrencyIsoCode: any
    // This is the ISO code of the currency in which the transaction was made.

    trnCurrencySymbol: string // "₪"
    // This is the symbol of the currency in which the transaction was made.

    trnExacWay: number
    // This is the exact way of the transaction.

    trnIntId: string
    // This is the ID of the transaction.

    trnNumaretor: number
    // This is the numerator of the transaction.

    trnPurchaseDate: string // date "2023-04-11T15:10:51"
    // This is the date on which the transaction was made.

    trnType: string // רגילה
    // This is the type of the transaction.

    walletProviderCode: number // 0 if not used, 3 - Apple Pay
    // This is the code of the wallet provider that was used for the transaction.

    walletProviderDesc: string // "" or "Apple Pay"
    // This is the name of the wallet provider that was used for the transaction.

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
