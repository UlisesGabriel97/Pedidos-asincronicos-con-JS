window.addEventListener('load', function () {

    let $ = (dato) => this.document.querySelector(dato)

    let title = $('#title')
    let rating = $('#rating')
    let awards = $('#awards')
    let release_date = $('#release_date')
    let length = $('#length')
    let form = $('.card formulario')
    let btn_create = $('#btn-Agregar')
    let btn_edit = $('#btn-Editar')
    let btn_delete = $('#btn-Borrar')
    let btn_traerPeli = $('#btn-traerPeli')
    let btn_actualizar = $('#btn-actualizar')

    btn_actualizar.addEventListener('click', function (e) {
        e.preventDefault()
        window.location.reload()
    })

    btn_traerPeli.addEventListener('click', function (e) {
        e.preventDefault()
        let idParams = window.prompt('Ingrese el id de la película que busca')
        fetch('http://localhost:3031/api/movies/' + idParams)
        .then(response => {
            if (!response) {
                window.alert('La película no se halló en la base de datos')
            } else {
            return response.json()
        }})
        .then(result => {
                let movie = result.data
                title.value = movie.title
                rating.value = movie.rating
                awards.value = movie.awards
                release_date.value = movie.release_date.split('T')[0]
                length.value = movie.length
        })
        .catch(errors => res.send(errors))

        btn_edit.addEventListener('click', function (e) {
            e.preventDefault()
            let pelicula = {
                title: title.value,
                rating: rating.value,
                awards: awards.value,
                release_date: release_date.value,
                length: length.value,
                genre_id: 1
            }
            if (window.confirm('¿Desea editar esta película?')) {
                fetch('http://localhost:3031/api/movies/update/' + idParams , {
                    method: 'PUT',
                    body: JSON.stringify(pelicula),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response) {
                        window.alert('La película se editó con exito')
                    } else {
                        window.alert('Hubo un problema al editar la película')
                    }
                })
                .catch(errors => res.send(errors))
            }
        })

        btn_delete.addEventListener('click', function (e) {
            e.preventDefault()
            if (window.confirm('¿Estas seguro que queres eliminar esta película?')) {
                fetch('http://localhost:3031/api/movies/delete/' + idParams , {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response) {
                        window.alert('La película se eliminó con exito')
                    } else {
                        window.alert('Hubo un problema al eliminar la película')
                    }
                })
                .catch(errors => res.send(errors))
            } else {
                window.alert('No eliminamos la película')
            }
        })
        
    })       

        btn_create.addEventListener('click', function (e) {
            e.preventDefault()
            let pelicula = {
                title: title.value,
                rating: rating.value,
                awards: awards.value,
                release_date: release_date.value,
                length: length.value,
                genre_id: 1
            }
            if (window.confirm('¿Estas seguro de crear la película?')) {
                fetch('http://localhost:3031/api/movies/create' , {
                    method: 'POST',
                    body: JSON.stringify(pelicula),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                .then(result => {
                    if (result) {
                        window.alert(`La película ${pelicula.title} fue creada con éxito`)
                    } else {
                        window.alert('Hubo un problema al crear la película')
                    }
                })
                .catch(errors => res.send(errors))
            }
        })


})