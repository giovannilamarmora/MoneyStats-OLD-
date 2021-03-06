$(document).ready(function () {
    // MODALE WALLET NELLA HOMEPAGE
    function getWallet(){
        $.get('/wallet/list', function (resume) {
            console.log(resume);
            const listWallet = $('#listWallet');
            for (let i = resume.length - 1; i >= 0; i--) {
                $(`<tr id='riga-${resume[i].id}'>
                <td>${resume[i].name}</td>
                <td>${resume[i].category.name}</td>
                <td>
                    <div class="btn-group roundedCorner" role="group">
                        <button id="btnGroupDrop1" type="button" class="btn btn-outline-warning roundedCorner dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Opzioni</button>
                            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <li><a class="dropdown-item btn-dettaglio" data-bs-toggle="modal" data-bs-target="#dettaglio" data-id='${resume[i].id}'>Dettaglio</a></li>
                                <li><a class="dropdown-item btn-modifica-risto" data-bs-toggle="modal" data-bs-target="#modifica" data-id='${resume[i].id}'>Modifica</a></li>
                                <li><a class="dropdown-item btn-elimina-risto" data-id='${resume[i].id}'>Elimina</a></li>
                            </ul>
                    </div>
                </td>
            </tr>`).hide().appendTo(listWallet).fadeIn(i * 20);
            }
        })
    }
    getWallet();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
          denyButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
    // MODALE AGGIUNGI WALLET HOMEPAGE
        $('#aggiungiWallet').click(function () {
            const wallet = {
                name: $('#name').val(),
                category: {
                    id: $('#catOptionhtml').val(),
                }
            }
            Swal.fire({
                icon: 'question',
                title: `Confermi il salvataggio di ${wallet.name}?`,
                showDenyButton: true,
                confirmButtonText: `Salva`,
                denyButtonText: `Non Salvare`,
              }).then((result) => {
                if (result.isConfirmed) {
                    addWallet(wallet);
                } else if (result.isDenied) {
                  swalWithBootstrapButtons.fire(`Portafoglio non Aggiunto`, '', 'info')
                }
              })
            

        $('#value').val('');
        $('#date').val('');
        $('#listWallet').val('');
    })

    function addWallet(wallet) {
        console.log("Dentro funzione")
        $.ajax({
            type: "POST",
            url: `/wallet/postWallet/${wallet.category.id}`,
            data: JSON.stringify(wallet),
            contentType: 'application/json',
            success: function (response) {
                Swal.fire('Salvato!', '', 'success')
            },
            error: function (err){

            }
        });
    }
});