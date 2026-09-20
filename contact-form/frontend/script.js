const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (event) => {
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

        document.getElementById("responseMessage").textContent =
            data.message;

        if (response.ok) {
            contactForm.reset();
        }

    } catch (error) {
        document.getElementById("responseMessage").textContent =
            "Unable to connect to server.";
    }
});
