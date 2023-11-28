export async function copyTable4() {
    const tableElement = document.querySelector('table');
    if (!tableElement) return;

    const newTable = document.createElement('table');
    newTable.innerHTML = tableElement.innerHTML;

    deleteOddRowsAndFooter(newTable);

    return navigator.clipboard.writeText(newTable.outerHTML);
}

export function copyTable5() {
    const tableObj = document.querySelector('table');
    if (!tableObj) return;

    hideOddRowsAndFooter(tableObj, true);

    // create a Range object
    const range = document.createRange();

    // add the Range to the set of window selections
    const selection = window.getSelection()!;
    selection.removeAllRanges();
    range.selectNode(tableObj); // range.selectNodeContents(tableObj);
    selection.addRange(range);

    const copy = document.execCommand('copy');

    // hideOddRowsAndFooter(tableObj, false);

    setTimeout(() => window.getSelection()!.empty(), 100);

    if (!copy) alert('Cannot copy');
}

function hideOddRowsAndFooter(table: HTMLTableElement, hide: boolean) {
    const {rows} = table.tBodies.item(0)!;
    for (let i= 1; i < rows.length; i+=2) {
        rows.item(i)!.hidden = hide;
    }
    table.querySelectorAll('mat-icon').forEach(icon => (icon as HTMLSpanElement).hidden = hide);
    table.querySelectorAll('span.costNis').forEach(icon => (icon as HTMLSpanElement).hidden = hide);

    table.createTFoot().hidden = hide;
}

function deleteOddRowsAndFooter(table: HTMLTableElement) {
    table.deleteTFoot();

    table.querySelectorAll('tr.expanded-details-row').forEach(expandedRow => expandedRow.remove());
    table.querySelectorAll('mat-icon').forEach(icon => icon.remove());
    table.querySelectorAll('span.costNis').forEach(expandedRow => expandedRow.remove());

    // remove all attributes
    table.querySelectorAll('div, span, tr, td, th').forEach(tag => {
        const names = tag.getAttributeNames();
        names.forEach(name => tag.removeAttribute(name));
    });
}
