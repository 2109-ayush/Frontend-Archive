import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getDatabase,
    ref,
    push,
    onValue,
    remove   
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

const firebaseConfig = {
    databaseURL: 'https://leads-tracker-app-9f9d6-default-rtdb.asia-southeast1.firebasedatabase.app/'
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDb = ref(database, 'leads')

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDb, (snapshot) => {
    const snapshotDoesExist = snapshot.exists()
    if(snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues) // Converting the snapshot object inside Firebase database into an array to render links on the web page
        render(leads)
    }
})

deleteBtn.addEventListener("dblclick", () => {
    remove(referenceInDb)
    ulEl.innerHTML = ''
})

inputBtn.addEventListener("click", function() {
    // Add validation here to prevent empty inputs
    if (!inputEl.value.trim()) {
        // Show warning by temporarily adding a red border and changing placeholder
        const originalPlaceholder = inputEl.placeholder
        const originalBorder = inputEl.style.borderBottom
        
        inputEl.style.borderBottom = "1px solid #ef233c"
        inputEl.placeholder = "Please enter a URL"
        
        // Reset after 1 second
        setTimeout(function() {
            inputEl.style.borderBottom = originalBorder
            inputEl.placeholder = originalPlaceholder
        }, 1000)
        
        return // Don't proceed with saving
    }
    push(referenceInDb, inputEl.value)
    inputEl.value = ""
})