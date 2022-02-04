document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#form").addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        (async () => {
            const response = await fetch(url + "/clientes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            });
            if (response.ok) alert("Cliente creado con éxito.");
            else {
                alert("Ha ocurrido un error.");
                console.error(response.status);
            }
        })();
    });
});