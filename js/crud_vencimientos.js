const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $frm_editar = d.querySelector(".frm-editar"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

  /*Metodo GET*/
const getAll = async () => {
  try {
    let res = await fetch("http://localhost:8080/webservices-1.0/vencimiento/listar"),
    datajson = await res.json();
    
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    console.log(datajson);

    /*data.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => {
          console.log(`${key} ${value}`);
      });*/

    /*datajson.forEach(item => {*/
      Object.entries(datajson).forEach(([key, value])=> {
        $template.querySelector(".id").textContent = `${value.idVencimiento}`;
        $template.querySelector(".fecha_inicio").textContent = `${value.fechaInicio}`;
        $template.querySelector(".fecha_fin").textContent = `${value.fechaFin}`;
        $template.querySelector(".dias_duracion").textContent = `${value.diasDuracion}`;
        
        $template.querySelector(".edit").dataset.id =  `${value.idVencimiento}`;
        $template.querySelector(".edit").dataset.fecha_inicio = `${value.fechaInicio}`;
        $template.querySelector(".edit").dataset.fecha_fin = `${value.fechaFin}`;
        $template.querySelector(".edit").dataset.dias_duracion = `${value.diasDuracion}`;
        
        $template.querySelector(".delete").dataset.id =  `${value.idVencimiento}`;
        
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);
      
  } catch (err) {
    console.log(err);
    let message = err.statusText || "Ocurrió un error [43]";
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
            "Content-type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            fechaInicio: e.target.fecha_inicio.value,
            fechaFin: e.target.fecha_fin.value,
            diasDuracion: e.target.dias_duracion.value
          })
        },

        res = await fetch("http://localhost:8080/webservices-1.0/vencimiento/crear", options)
          

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
            idVencimiento: e.target.id.value,
            fechaInicio: e.target.fecha_inicio.value,
            fechaFin: e.target.fecha_fin.value,
            diasDuracion: e.target.dias_duracion.value
          })
        },

         res = await fetch(`http://localhost:8080/webservices-1.0/vencimiento/actualizar/`, options)

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error [94]";
        $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
      }
    }
  }
});

  $table.addEventListener("click", async e => {
  if (e.target.matches(".edit")) {
    console.log(e.target);
    $frm_editar.fecha_inicio.value = e.target.dataset.fecha_inicio;
    $frm_editar.fecha_fin.value = e.target.dataset.fecha_fin;
    $frm_editar.dias_duracion.value = e.target.dataset.dias_duracion;
    $frm_editar.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    let isDelete = confirm(`¿Estás seguro de eliminar el Registro ID ${e.target.dataset.id}?`);
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
          res = await fetch(`http://localhost:8080/webservices-1.0/vencimiento/delete/${e.target.dataset.id}`, options)

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
