const contactsList = document.getElementById("contactsList");

async function loadContacts() {

const response = await fetch("/contacts");
const contacts = await response.json();

contactsList.innerHTML = "";

contacts.forEach((contact) => {

    const card = document.createElement("div");

    card.className = "contact-card";

    card.innerHTML = `
        <h2>${contact.name}</h2>
        <p>Email: ${contact.email}</p>
        <p>Message: ${contact.message}</p>
        <p>Submitted: ${new Date(contact.submissionDate).toLocaleString()}</p>
    `;

    contactsList.appendChild(card);
});
}
loadContacts();