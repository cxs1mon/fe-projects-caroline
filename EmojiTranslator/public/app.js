// TODO: define logic for all event listeners and localStorage
const emoji = "🌞";


function saveInput(e) {
    e.preventDefault();
    const text = e.target.elements[0].value
    localStorage.setItem(text, emoji);

    addElement(text);
}

// adds input into localStorage, display in history and translate results
function addElement(text) {

    createHistoryElement(text);

    const t_result = document.querySelector(".translator__result");
    t_result.innerHTML = emoji;
}


// display the local storage as history when page loads
function loadFullHistory() {

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        createHistoryElement(key);
    }

    console.log("done");
}

function createHistoryElement(text) {
    const h_element = document.createElement("p");
    h_element.classList.add("row", "justify-content-space-between")

    const h_text = document.createElement("p");
    h_text.innerHTML = (text + ' -> ' + localStorage.getItem(text));
    h_text.classList.add("col-10")

    const h_delete = document.createElement("p");
    h_delete.innerHTML = "delete";
    h_delete.setAttribute("onClick", `removeHistoryElement(\"${text}\");`)
    h_delete.classList.add("col-2")

    h_element.appendChild(h_text)
    h_element.appendChild(h_delete)

    const historyList = document.querySelector(".history__list");
    historyList.appendChild(h_element);

    return historyList;
}

function removeHistoryElement(name) {
    localStorage.removeItem(name);

    const h_allElements = document.querySelectorAll('.history__list p p');

    h_allElements.forEach(element => {

        const element_text = element.innerHTML;
        const textBeforeArrow = element_text.split('->')[0].trim();

        if (textBeforeArrow === name) {
            element.parentElement.remove();
        }
    });

}
