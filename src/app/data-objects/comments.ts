import {IPayment} from '../interfaces/IPayment';

export const comments: IPayment[] = [
  { keyword: "הוראת קבע רכישה רגילה", translation: "Regular purchase", icon: "shopping_cart" },
  { keyword: "בנוכחות כרטיס", translation: "Card was presented", icon: "credit_card" },
  { keyword: "עסקה עם הנחה", translation: "Deal with discount", icon: "local_offer" },
  { keyword: "זיכוי בגין רכישה רגילה", translation: "Refund for regular purchase", icon: "undo" },
  { keyword: "החזר מיידי", translation: "Refund", icon: "settings_backup_restore" },
  { keyword: "משיכת מזומן", translation: "Cash withdrawal", icon: "attach_money" },
  { keyword: "עסקה בקליטה", translation: "Transaction still in progress", icon: "hourglass_empty" },
  { keyword: 'עמלת עסקת מט"ח: (2.8%)', translation: "Foreign currency exchange fee (2.8%)", icon: "currency_exchange" },
  { keyword: "למסור את 4 הספרות של מזהה הכרטיס בארנק", translation: "ApplePay/GooglePay", icon: "contactless" },
  { keyword: "תשלום בנייד", translation: "ApplePay/GooglePay", icon: "contactless" },
  { keyword: "עסקה זו בוצעה באינטרנט ואושרה על ידך באמצעות שירות קניה בטוחה", translation: "Secure Online payment", icon: "credit_score" },
  { keyword: "אינטרנט", translation: "Online payment", icon: "credit_score" },
  { keyword: "קניה בטוחה באינטרנט", translation: "Secure payment online", icon: "lock" },
  { keyword: "Contact less", translation: "Contact-less payment", icon: "contactless" },
  { keyword: "עסקת contactless", translation: "Contact-less payment", icon: "contactless" },
  // { keyword: "העברת כספים ל", translation: "Money transfer", icon: "send" },
  { keyword: "דמי חבר", translation: "Member service fee", icon: "person" },
  { keyword: "שרותים", translation: "Service fee", icon: "settings" },
  { keyword: "נגבה בגין העמלה", translation: "Charged for the commission", icon: "local_atm" },
  { keyword: "המחזור לפטור מלא מעמלת דמי כרטיס ולכן לא חויבת", translation: "Service fee not charged", icon: "not_interested" },
];
