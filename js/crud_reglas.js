const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $frm_editar = d.querySelector(".frm-editar"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

  /*Metodo GET*/
const getAll = async () => {
  try {
    let res = await fetch("http://localhost:8080/webservices-1.0/regla/listar"),
    datajson = await res.json();
    
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    console.log(datajson);

    /*data.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => {
          console.log(`${key} ${value}`);
      });*/

    /*datajson.forEach(item => {*/
      Object.entries(datajson).forEach(([key, value])=> {
        $template.querySelector(".id").textContent = `${value.idRegla}`;
        $template.querySelector(".limite_inferior").textContent = `${value.limiteInferior}`;
        $template.querySelector(".limite_superior").textContent = `${value.limiteSuperior}`;
        $template.querySelector(".monto_equivalencia").textContent = `${value.montoEquivalencia}`;
        $template.querySelector(".puntos").textContent = `${value.puntos}`;

        $template.querySelector(".edit").dataset.id =  `${value.idRegla}`;
        $template.querySelector(".edit").dataset.limite_inferior = `${value.limiteInferior}`;
        $template.querySelector(".edit").dataset.limite_superior = `${value.limiteSuperior}`;
        $template.querySelector(".edit").dataset.monto_equivalencia = `${value.montoEquivalencia}`;
        $template.querySelector(".edit").dataset.puntos = `${value.puntos}`;
        
        $template.querySelector(".delete").dataset.id =  `${value.idRegla}`;
        
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);
      
  } catch (err) {
    console.log(err);
    let message = err.statusText || "Ocurrió un error [45]";
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
            limiteInferior: e.target.nombre.value,
            limiteSuperior: e.target.apellido.value,
            montoEquivalencia: e.target.numerodoc.value,
            puntos: e.target.tipodoc.value
          })
        },

        res = await fetch("http://localhost:8080/webservices-1.0/regla/crear", options)
          

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrió un error [80]";
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
            idRelga: e.target.id.value,
            limiteInferior: e.target.limite_inferior.value,
            limiteSuperior: e.target.limite_superior.value,
            montoEquivalencia: e.target.monto_equivalencia.value,
            puntos: e.target.puntos.value

          })
        },

         res = await fetch(`http://localhost:8080/webservices-1.0/regla/actualizar/`, options)

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error [107]";
        $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
      }
    }
  }
});

  $table.addEventListener("click", async e => {
  if (e.target.matches(".edit")) {
    console.log(e.target);
    $frm_editar.limite_inferior.value = e.target.dataset.limite_inferior;
    $frm_editar.limite_superior.value = e.target.dataset.limite_superior;
    $frm_editar.monto_equivalencia.value = e.target.dataset.monto_equivalencia;
    $frm_editar.puntos.value = e.target.dataset.puntos;
    $frm_editar.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    let isDelete = confirm(`¿Estás seguro de eliminar el Registro ID= ${e.target.dataset.id}?`);
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
          res = await fetch(`http://localhost:8080/webservices-1.0/regla/delete/${e.target.dataset.id}`, options)

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error [142]";
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
