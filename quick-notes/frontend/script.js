const noteForm = document.getElementById("noteForm");
const message = document.getElementById("message");

noteForm.addEventListener("submit", async (event) => {

    event.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    try {
        const response = await fetch("/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content
            })
        });

        const data = await response.json();
        if (response.ok) {
            message.textContent = data.message;
            noteForm.reset();
        } else {
            message.textContent = data.error;
        }
    } catch (error) {
        message.textContent = "Unable to connect to the server.";
    }

});