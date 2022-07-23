const d = document,
    $table = d.querySelector('.crud-table'),
    $form = d.querySelector('.crud-form'),
    $title = d.querySelector('.crud-title'),
    $template = d.getElementById("crud-template").content,
    $fragment = d.createDocumentFragment();

const getAll = async () => {
    try {
        let res = await fetch("http://localhost:3000/Distancia");
        json = await res.json();
        if (!res.ok) throw { estado: res.status, estadoTxt: res.statusText };
        //console.log(json);

        json.forEach(el => {
            $template.querySelector(".name").textContent = el.clase;
            $template.querySelector(".weapon").textContent = el.arma;
            $template.querySelector(".edit").dataset.id = el.id;
            $template.querySelector(".edit").dataset.clase = el.clase;
            $template.querySelector(".edit").dataset.arma = el.arma;
            $template.querySelector(".delete").dataset.id = el.id;

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone)
        });

        $table.querySelector("tbody").appendChild($fragment);
    } catch (err) {
        let message = err.estado || "Ocurrio un error"
        $table.insertAdjacentHTML("afterend", `<p><b>Error ${err.estado}: ${err.estadoTxt}</p></b>`);

    }
}

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async e => {
    if (e.target === $form) {
        e.preventDefault();
        if (!e.target.id.value) {
            //console.log("hola desde form");
            //create-POST
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        clase: e.target.nombre.value,
                        arma: e.target.arma.value
                    })
                },//opciones del objeto fetch
                res = await fetch("http://localhost:3000/Distancia", options);
                json = await res.json();
                console.log(options.clase);
                console.log(options.arma);

                if (!res.ok) throw { estado: res.status, estadoTxt: res.statusText };

            } catch (err) {
                let message = err.estado || "Ocurrio un error"
                $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.estado}: ${err.estadoTxt}</p></b>`);
            }
        } else {
            //update-PUT
        }
    }
})