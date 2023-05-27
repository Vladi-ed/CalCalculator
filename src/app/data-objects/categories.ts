import {IPayment} from '../interfaces/IPayment';

export const categories: IPayment[] = [
  { keyword: "מזון ומשקאות",  translation: "food",        icon: "fastfood" },
  { keyword: "מסעדות",        translation: "restaurants", icon: "restaurant" },
  { keyword: "ציוד ומשרד",    translation: "service fee", icon: "business" },
  { keyword: "פנאי בילוי",    translation: "entertainment", icon: "local_play" },
  { keyword: "משחקי מזל",     translation: "entertainment", icon: "casino" },
  { keyword: "רפואה ובריאות", translation: "health",      icon: "local_hospital" },
  { keyword: "תקשורת ומחשבים", translation: "communication and computers", icon: "computer" },
  { keyword: "ריהוט ובית",    translation: "household",     icon: "home" },
  { keyword: "ילדים",         translation: "child",         icon: "child_friendly" },
  { keyword: "ביטוח ופיננסים", translation: "insurance",    icon: "shield_person" },
  { keyword: "פיננסים",       translation: "finance services", icon: "attach_money" },

];