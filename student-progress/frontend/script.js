const form = document.getElementById("contactForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (event) => {

event.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const message = document.getElementById("message").value;

try {

    const response = await fetch("/submit-contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            message
        })
    });

    const data = await response.json();

    if (response.ok) {
        result.textContent = data.message;
        form.reset();
    } else {
        result.textContent = data.message;
    }

} catch (error) {

    result.textContent = "Unable to connect to server";

}

});