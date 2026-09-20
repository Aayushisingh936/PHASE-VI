const feedbackForm = document.getElementById("feedbackForm");
const message = document.getElementById("message");

feedbackForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    try {
        const response = await fetch("/submit-feedback", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                rating,
                comment
            })
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = data.message;
            feedbackForm.reset();

        } else {
            message.textContent = data.error;
        }

    } catch (error) {
        message.textContent = "Unable to connect to the server.";
    }

});
