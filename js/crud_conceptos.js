const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $frm_editar = d.querySelector(".frm-editar"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

  /*Metodo GET*/
const getAll = async () => {
  try {
    let res = await fetch("http://localhost:8080/webservices-1.0/concepto/listar"),
    datajson = await res.json();
    
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    console.log(datajson);

    /*data.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => {
          console.log(`${key} ${value}`);
      });*/

    /*datajson.forEach(item => {*/
      Object.entries(datajson).forEach(([key, value])=> {
        $template.querySelector(".id").textContent = `${value.idConcepto}`;
        $template.querySelector(".descripcion_concepto").textContent = `${value.descripcion}`;
        $template.querySelector(".puntos_requeridos").textContent = `${value.puntosRequeridos}`;

        $template.querySelector(".edit").dataset.id =  `${value.idConcepto}`;
        $template.querySelector(".edit").dataset.descripcion_concepto = `${value.descripcion}`;
        $template.querySelector(".edit").dataset.puntos_requeridos = `${value.puntosRequeridos}`;
        
        $template.querySelector(".delete").dataset.id =  `${value.idConcepto}`;
        
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);
      
  } catch (err) {
    console.log(err);
    let message = err.statusText || "Ocurrió un error [41]";
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
            descripcion: e.target.descripcion_concepto.value,
            puntosRequeridos: e.target.puntos_requeridos.value
          })
        },

        res = await fetch("http://localhost:8080/webservices-1.0/concepto/crear", options)
          

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrió un error [74]";
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
            idConcepto: e.target.id.value,
            descripcion: e.target.descripcion_concepto.value,
            puntosRequeridos: e.target.puntos_requeridos.value
          })
        },

         res = await fetch(`http://localhost:8080/webservices-1.0/concepto/actualizar/`, options)

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error [98]";
        $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
      }
    }
  }
});

  $table.addEventListener("click", async e => {
  if (e.target.matches(".edit")) {
    console.log(e.target);
    $frm_editar.descripcion_concepto.value = e.target.dataset.descripcion_concepto;
    $frm_editar.puntos_requeridos.value = e.target.dataset.puntos_requeridos;
    $frm_editar.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    let isDelete = confirm(`¿Estás seguro de eliminar el Concepto id ${e.target.dataset.id}?`);
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
          res = await fetch(`http://localhost:8080/webservices-1.0/concepto/delete/${e.target.dataset.id}`, options)

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error [131]";
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
