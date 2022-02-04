const id = sessionStorage.getItem("editId");
document.addEventListener("DOMContentLoaded", async () => {
    const data = (await fetch(url + "/clientes")).json();
    data.then(clients => {
        for (let i of clients) {
            if (i._id === sessionStorage.getItem("editId")) {
                sessionStorage.removeItem("editId");
                fillFields(i);
            }
        }
    });
    document.querySelector("#form").addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        (async () => {
            const response = await fetch(url + "/clientes/" + id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            });
            if (response.ok) alert("Cliente modificado con éxito.");
            else {
                alert("Ha ocurrido un error.");
                console.error(response.status);
            }
        })();
    });
});

const fillFields = client => {
    document.querySelector("#nombre").value = client.nombre;
    document.querySelector("#apellido").value = client.apellido;
    document.querySelector("#rut").value = client.rut;
    document.querySelector("#tipo").querySelectorAll("option").forEach(ele => {
        if (ele.innerText.toLowerCase() === client.tipo) ele.selected = true;
        else ele.selected = false;
    });
    document.querySelector("#telefono").value = client.telefono;
    document.querySelector("#activo").querySelectorAll("option").forEach(ele => {
        if (ele.innerText.toLowerCase() === client.activo) ele.selected = true;
        else ele.selected = false;
    });
}