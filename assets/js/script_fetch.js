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
        console.log(json);

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