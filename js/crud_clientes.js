const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $frm_editar = d.querySelector(".frm-editar"),
  $title = d.querySelector(".crud-title"), /*verif*/
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

  /*Metodo GET*/
const getAll = async () => {
  try {
    /*let res = await fetch("https://randomuser.me/api/?results=3"),*/
    /*let res = await fetch("http://localhost:3000/clientes"),*/
    let res = await fetch("http://localhost:8080/webservices-1.0/cliente/listar"),
    datajson = await res.json();
    /*alert("16");*/
    
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    console.log(datajson);

    /*data.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => {
          console.log(`${key} ${value}`);
      });*/

    /*datajson.forEach(item => {*/
      Object.entries(datajson).forEach(([key, value])=> {
        $template.querySelector(".id").textContent = `${value.idCliente}`;
        $template.querySelector(".nombre").textContent = `${value.nombre}`;
        $template.querySelector(".apellido").textContent = `${value.apellido}`;

        $template.querySelector(".numerodoc").textContent = `${value.nroDocumento}`;
        $template.querySelector(".tipodoc").textContent = `${value.tipoDocumento}`;
        $template.querySelector(".nacionalidad").textContent = `${value.nacionalidad}`;
        $template.querySelector(".email").textContent = `${value.email}`;
        $template.querySelector(".telefono").textContent = `${value.telefono}`;
        $template.querySelector(".fechanac").textContent = `${value.fechaNacimiento}`;

        $template.querySelector(".edit").dataset.id =  `${value.idCliente}`;
        $template.querySelector(".edit").dataset.nombre = `${value.nombre}`;
        $template.querySelector(".edit").dataset.apellido = `${value.apellido}`;
        $template.querySelector(".edit").dataset.numerodoc = `${value.nroDocumento}`;
        $template.querySelector(".edit").dataset.tipodoc = `${value.tipoDocumento}`;
        $template.querySelector(".edit").dataset.nacionalidad = `${value.nacionalidad}`;
        $template.querySelector(".edit").dataset.email = `${value.email}`;
        $template.querySelector(".edit").dataset.telefono = `${value.telefono}`;
        $template.querySelector(".edit").dataset.fechanac = `${value.fechaNacimiento}`;
        
        $template.querySelector(".delete").dataset.id =  `${value.idCliente}`;
        
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);
      
  } catch (err) {
    console.log(err);
    let message = err.statusText || "Ocurrió un error [58]";
    $table.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
  }
}

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async e => {
  if (e.target === $form || e.target === $frm_editar) {
    e.preventDefault();

    if (!e.target.id.value) {
      //Crear - POST
      try {
        let options = {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=utf-8",
            "Accept":"application/json"
          },
          body: JSON.stringify({
            nombre: e.target.nombre.value,
            apellido: e.target.apellido.value,
            nroDocumento: e.target.numerodoc.value,
            tipoDocumento: e.target.tipodoc.value,
            nacionalidad: e.target.nacionalidad.value,
            email: e.target.email.value,
            telefono: e.target.telefono.value,
            fechaNacimiento: e.target.fechanac.value
          })
        },
        /*res = await fetch("http://localhost:3000/clientes", options),*/
        /*res = await fetch("http://localhost:8080/webservices-1.0/cliente/crear", options),*/
        /*json = await res.json();*/
        res = await fetch("http://localhost:8080/webservices-1.0/cliente/crear", options)
          

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrió un error [71]";
        $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
      }
    } else {
      //Actualizar - PUT
      try {
        let options = {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            idCliente: e.target.id.value,
            nombre: e.target.nombre.value,
            apellido: e.target.apellido.value,
            nroDocumento: e.target.numerodoc.value,
            tipoDocumento: e.target.tipodoc.value,
            nacionalidad: e.target.nacionalidad.value,
            email: e.target.email.value,
            telefono: e.target.telefono.value,
            fechaNacimiento: e.target.fechanac.value
          })
        },
          /*res = await fetch(`http://localhost:3000/clientes/${e.target.id.value}`, options),*/
         /*res = await fetch(`http://localhost:8080/webservices-1.0/cliente/actualizar/${e.target.id.value}`, options),*/
         /*json = await res.json();*/
         res = await fetch(`http://localhost:8080/webservices-1.0/cliente/actualizar/`, options)

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error [94]";
        $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
      }
    }
  }
});

/*d.addEventListener("click", async e => {*/
  $table.addEventListener("click", async e => {
  /*console.log(e.target);*/
  /*event.preventDefault();*/
  if (e.target.matches(".edit")) {
    /*e.preventDefault();*/
    /*alert("121:"+e.target);*/
    console.log(e.target);
    $frm_editar.nombre.value = e.target.dataset.nombre;
    $frm_editar.apellido.value = e.target.dataset.apellido;
    $frm_editar.numerodoc.value = e.target.dataset.numerodoc;
    $frm_editar.tipodoc.value = e.target.dataset.tipodoc;
    $frm_editar.nacionalidad.value = e.target.dataset.nacionalidad;
    $frm_editar.email.value = e.target.dataset.email;
    $frm_editar.telefono.value = e.target.dataset.telefono;
    $frm_editar.fechanac.value = e.target.dataset.fechanac;
    $frm_editar.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    let isDelete = confirm(`¿Estás seguro de eliminar el Cliente id ${e.target.dataset.id}?`);
    /*let isDelete = true;*/
    if (isDelete) {
      //Delete - DELETE
      try {
        let options = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=utf-8"
          }
        },
          /*res = await fetch(`http://localhost:8080/webservices-1.0/cliente/delete/${e.target.dataset.id}`, options),*/
          /*json = await res.json();*/
          res = await fetch(`http://localhost:8080/webservices-1.0/cliente/delete/${e.target.dataset.id}`, options)

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error [128]";
        alert(`Error ${err.status}: ${message}`);
      }
    }
  }
})

/*Cerrar Modal*/
/*const closeButton = $frm_editar.querySelector('.close');
closeButton.addEventListener('click', () => {
    dialog.close();
});*/
