const d = document,
  $table = d.querySelector(".crud-table"),
  $frm_cargar = d.querySelector(".frm-cargar"),
  $frm_utilizar = d.querySelector(".frm-utilizar"),
  $frm_puntos = d.querySelector(".frm-puntos"),
  $title = d.querySelector(".crud-title"), /*verif*/
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

  
/*d.addEventListener("DOMContentLoaded", getAll);*/

d.addEventListener("submit", async e => {
  if (e.target === $frm_cargar) {
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
            cliente: e.target.codigo_cliente.value,
            monto: e.target.monto.value
          })
        },
        res = await fetch(`http://localhost:8080/webservices-1.0/bolsa/cargarpuntos/${e.target.codigo_cliente.value}/${e.target.monto.value}`, options)
          

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrió un error [38]";
        $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
      }
    }
  }else if (e.target === $frm_utilizar) {
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
            cliente: e.target.codigo_cliente.value,
            concepto: e.target.codigo_concepto.value
          })
        },
        
        res = await fetch(`http://localhost:8080/webservices-1.0/bolsa/utilizarpuntos/${e.target.codigo_cliente.value}/${e.target.codigo_concepto.value}`, options)
          

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrió un error [67]";
        $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
      }
    }
  }else if (e.target === $frm_puntos) {
    e.preventDefault();

    if (!e.target.id.value) {
      /*GET*/
      try {
        let options = {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            monto: e.target.monto.value
          })
        },
        
        res = await fetch(`http://localhost:8080/webservices-1.0/bolsa/consultarpuntos/${e.target.monto.value}`, options)
          

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        datajson = res.json();
        console.log(datajson);
        $frm_puntos.getElementById("puntos_xvla").textContent = `${datajson.resultado}`;;
        /*location.reload();*/
      } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrió un error [67]";
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
    /*$frm_editar.nombre.value = e.target.dataset.nombre;
    $frm_editar.id.value = e.target.dataset.id;*/
  }
})

/*Cerrar Modal*/
/*const closeButton = $frm_editar.querySelector('.close');
closeButton.addEventListener('click', () => {
    dialog.close();
});*/
