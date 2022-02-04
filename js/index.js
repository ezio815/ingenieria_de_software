document.addEventListener("DOMContentLoaded", async () => {
    const data = (await fetch(url + "/clientes")).json();
    data.then(clients => showClients(clients));
});

const showClients = data => {
    let list = "";
    for (let i of data) {
        list += `
        <div class="col-2 border">${i._id}</div>
        <div class="col-1 border">${i.nombre}</div>
        <div class="col-1 border">${i.apellido}</div>
        <div class="col-2 border">${i.rut}</div>
        <div class="col-1 border">${i.tipo}</div>
        <div class="col-2 border">${i.telefono}</div>
        <div class="col-1 border">${i.activo}</div>
        <div class="col-2 border">
            <button class="btn btn-secondary my-1 mx-1" onclick="edit('${i._id}')">Select</button>
            <button class="btn btn-danger my-1 mx-1" onclick="del('${i._id}')">Delete</button>
        </div>
        `;
    }
    document.querySelector("#container").innerHTML = list;
}

const edit = id => {
    sessionStorage.setItem("editId", `${id}`);
    location = "edit.html";
}

const del = id => {
    const response = confirm("¿Seguro que desea eliminar ese cliente?");
    if (response) {
        (async () => {
            const res = await fetch(url + "/clientes/" + id, {method: "DELETE"});
            if (res.ok) {
                alert("Cliente eliminado con éxito.");
                location.reload();
            }
            else {
                alert("Ha ocurrido un error.");
                console.error(res.status);
            }
        })();
        
    }
}