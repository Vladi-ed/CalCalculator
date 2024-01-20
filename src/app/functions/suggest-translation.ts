import {IRecord} from "../interfaces/IRecord";

export function suggestTranslation(record: IRecord) {
    const translation = prompt('Type your translation:');
    if (!translation) return;

    record.translation = translation;

    const body = JSON.stringify({
        keyword: record.description,
        translation,
        category: record.myCategory || record.categoryHeb
    });

    const localTranslation = localStorage.getItem('translation');

    if (localTranslation) {
        const newStr = localTranslation.slice(0, -1) + ', ' + body + ']';
        localStorage.setItem('translation', newStr);
    }
    else localStorage.setItem('translation', '[' + body + ']');


    fetch('/suggest-translation.api', { method: 'POST', body }) // .then(() => alert('Translation sent, thank you!'))
        .catch(() => alert('There is a problem with sending your translation. Please try again later.'));
}