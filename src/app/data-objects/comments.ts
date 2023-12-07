import {IPayment} from '../interfaces/IPayment';

export const comments: IPayment[] = [
  { keyword: "הוראת קבע רכישה רגילה", translation: "Regular payment", icon: "shopping_cart" },
  { keyword: "עסקה עם הנחה", translation: "Discount price", icon: "local_offer" },
  { keyword: "זיכוי בגין רכישה רגילה", translation: "Return of Regular payment", icon: "undo" },
  { keyword: "החזר מיידי", translation: "Refund", icon: "settings_backup_restore" },
  { keyword: "משיכת מזומן", translation: "Cash withdrawal", icon: "attach_money" },
  { keyword: "עסקה בקליטה", translation: "Transaction still in progress", icon: "hourglass_empty" },
  { keyword: 'עמלת עסקת מט"ח: (2.8%)', translation: "Foreign currency exchange fee (2.8%)", icon: "currency_exchange" },
  { keyword: "למסור את 4 הספרות של מזהה הכרטיס בארנק", translation: "ApplePay/GooglePay", icon: "contactless" },
  { keyword: "עסקה זו בוצעה באינטרנט ואושרה על ידך באמצעות שירות קניה בטוחה", translation: "Secure Online payment", icon: "credit_score" },
  { keyword: "קניה בטוחה באינטרנט", translation: "Secure payment online", icon: "lock" },
  { keyword: "Contact less", translation: "Contact-less payment", icon: "contactless" },
  // { keyword: "העברת כספים ל", translation: "Money transfer", icon: "send" },
  { keyword: "דמי חבר", translation: "Member Service fee", icon: "person" },
  { keyword: "שרותים", translation: "Service fee", icon: "settings" },
  { keyword: "נגבה בגין העמלה", translation: "Tax included", icon: "local_atm" },
  { keyword: "המחזור לפטור מלא מעמלת דמי כרטיס ולכן לא חויבת", translation: "No card Service fee", icon: "not_interested" },
];
