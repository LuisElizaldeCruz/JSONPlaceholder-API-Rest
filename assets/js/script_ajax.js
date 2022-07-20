const d = document,
    $table = d.querySelector('.crud-table'),
    $form = d.querySelector('.crud-form'),
    $title = d.querySelector('.crud-title'),
    $template = d.getElementById("crud-template").content,
    $fragment = d.createDocumentFragment();



const ajax = (options) => {
    let { url, method, success, error, data } = options;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", e => {

        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            let json = JSON.parse(xhr.responseText);
            success(json);

        } else {
            let message = xhr.statusText || "Ocurrio un error";
            error(`Error ${xhr.status}: ${message}`)

        }
    });

    xhr.open(method || "GET", url);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));
}

const getAllDistancia = () => {
    ajax({
        method: "GET",
        url: "http://localhost:3000/Distancia",
        success: (res) => {
            console.log(res);
            res.forEach(el => {
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
        },
        error: (err) => {
            console.error(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</p></b>`)
        },
        //data: null
    })
}

d.addEventListener("DOMContentLoaded", getAllDistancia);

d.addEventListener("submit", e => {

    if (e.target === $form) {
        e.preventDefault();
        if (!e.target.id.value) {
            //create-POST
            ajax({
                url: "http://localhost:3000/Distancia",
                method: "POST",
                success: (res) => location.reload(),
                error: () => $form.insertAdjacentHTML("afterend", `<p><b>${err}</p></b>`),
                data: {
                    clase: e.target.nombre.value,
                    arma: e.target.arma.value
                }
            });
        } else {
            //update--PUT
            ajax({
                url: `http://localhost:3000/Distancia/${e.target.id.value}`,
                method: "PUT",
                success: (res) => location.reload(),
                error: () => $form.insertAdjacentHTML("afterend", `<p><b>${err}</p></b>`),
                data: {
                    clase: e.target.nombre.value,
                    arma: e.target.arma.value
                }
            });
        };
    };
});

d.addEventListener("click", e => {
    if (e.target.matches(".edit")) {
        $title.textContent = "Editar Clase"
        $form.nombre.value = e.target.dataset.clase;
        $form.arma.value = e.target.dataset.arma;
        $form.id.value = e.target.dataset.id;

    };
    if (e.target.matches(".delete")) {
        let isDelete = confirm(`¿Esta seguro de eliminar el id ${e.target.dataset.id}`);
        if (isDelete) {
            //delete--DELETE
            ajax({
                url: `http://localhost:3000/Distancia/${e.target.dataset.id}`,
                method: "DELETE",
                success: (res) => location.reload(),
                error: () => alert(err)
            });
        }
    };
});