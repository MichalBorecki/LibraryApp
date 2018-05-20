$(function () {
    url = "http://localhost:8080/M5_Spring_Workshop/";

    var formAdd = $("#form-add");
    var pRoll = $(".roll");
    var list = $("#books");


    function showBooks(bookToShow) {
        ajaxCall()
            .done(function (books) {
                console.log("Zaladowano dane");

                var bookList = $("#books");
                // reset bookList
                bookList.empty();

                // if book found show only this book on list
                if (bookToShow !== undefined) {
                    books = bookToShow;
                }

                $(books).each(function (index, book) {
                    //cosole.log(book);
                    var liForItem = $(
                        `<li class="li-books" data="GET" data-id=${book.id}>${book.title}
                    <a class="a-books" id="get" data-type="GET" data-id="${book.id}">Edytuj</a>
                    <a class="a-books"  id="del" data-type="DELETE" data-id="${book.id}">Usuń</a>
                    </li>`);

                    /*
                    Below "aDel.on("click".."" and "aGet.on("click".."" must be in this function because they are assigned to each new 'li' element
                    */

                    //find delete button
                    var aDel = liForItem.find("#del");
                    // on click delete button
                    aDel.on("click", function (event) {
                        // 'a' is child of 'li', so add stopPropagation for stop implementing event of li elements
                        event.stopPropagation();

                        var htmlType = $(event.target).data("type");
                        var id = $(event.target).data("id");
                        ajaxCall(htmlType, id)
                            .done(function () {
                                console.log("Usunięto książkę");
                                // after delete the book, update book list
                                showBooks();
                            })
                            .fail(function () {
                                console.log("Błąd usuwania książki");
                            })
                            .always(function () {
                                console.log("Koniec usuwania książki");
                            });
                    });

                    //find update button
                    var aGet = liForItem.find("#get");

                    // on click update button - get informations about choosed book and put them into form-add for update
                    aGet.on("click", function (event) {
                        // 'a' is child of 'li', so add stopPropagation for stop implementing event of li elements
                        event.stopPropagation();

                        var htmlType = $(event.target).data("type");
                        var id = $(event.target).data("id");
                        ajaxCall(htmlType, id)
                            .done(function (data) {
                                console.log("Ładowanie danych książki");

                                // add data of this book into form-add
                                formAdd.find("#id").val(data.id);
                                formAdd.find("#title").val(data.title);
                                formAdd.find("#author").val(data.author);
                                formAdd.find("#publisher").val(data.publisher);
                                formAdd.find("#type").val(data.type);
                                formAdd.find("#isbn").val(data.isbn);

                                // change method (on "PUT") and text of button (on "Uaktualnij dane"). Those changes are undone on submit button click (in form-add)
                                formAdd.prop("method", "PUT");
                                formAdd.find(".btn-primary").text("Uaktualnij dane");

                                if (formAdd.css('display') == 'none') {
                                    formAdd.slideToggle("fast");
                                }
                            })
                            .fail(function () {
                                console.log("Błąd ładowania danych książki");
                            })
                            .always(function () {
                                console.log("Koniec ładowania danych książki");
                            });
                    });

                    // add 'li' with button for delete in tag <a>
                    bookList.append(liForItem);

                    // add div - information about the book will be shown in it 
                    bookList.append($(`<div class="desc">`));
                });
            })
            .fail(function () { console.log("Błąd połączenia"); })
            .always(function () { console.log("Koniec połaczenia"); });
    }

    showBooks();


    // onClick roll form by slideToggle
    pRoll.on("click", function (event) {
        var content = $(event.target).next();
        content.slideToggle("fast");

        // clear form fields
        clearForm(formAdd);
    });


    // onClick add divs under 'li', with informations about book, then slide down
    list.on("click", "li", function (event) {
        var div = $(event.target).next();
        if (div.text().length == 0) {

            var id = $(event.target).data("id");
            var htmlType = $(event.target).data("type");
            ajaxCall(htmlType, id)
                .done(function (book) {
                    console.log("Szczegóły książki wczytane");

                    // add into div informations about this book
                    div.html(`<p><b>Author:&#09;</b> ${book.author}</p><p><b>Wydawnictwo:&nbsp;</b> ${book.publisher}</p>`).slideDown("fast");
                })
                .fail(function () {
                    console.log("Nie udało się załadować informacji o książce");
                })
                .always(function () {
                    console.log("Koniec połączenia ze szczegółami książki");
                });
        }
        div.slideToggle("fast");
    });


    // search form, works on submit
    var formSearch = $("#form-search");
    formSearch.on("submit", function (event) {
        console.log("Szukam książki");

        event.preventDefault();

        var jsonData = "";
        var htmlType = $(event.target).attr("method");
        var id = formSearch.find("input").val();

        ajaxCall(htmlType, id, jsonData)
            .done(function (bookFound) {
                console.log("Znalaziono książkę");

                // change text of element 'p'
                list.prev().text("Znaleziona książka: ");

                showBooks(bookFound);
            })
            .fail(function () {
                console.log("Nie znaleziono");
                alert("Nie znaleziono książki o ID = " + id);
            })
            .always(function () { console.log("Koniec wyszukiwania"); }
            );
            formSearch.find("#id").val("");
    });


    // add form, works on submit
    formAdd.on("submit", function (event) {
        console.log("Dodawanie książki");

        event.preventDefault();

        // format properly data from 'formAdd' (construct data without 'name' and 'value' in jsonData array)
        var formData = formAdd.serializeArray();
        var data = {};
        $.map(formData, function (obj, i) {
            data[obj['name']] = obj['value'];
        })
        var jsonData = JSON.stringify(data);

        var htmlType = $(event.target).attr("method");
        var id = "";

        ajaxCall(htmlType, id, jsonData)
            .done(function () {
                console.log("Dodano książkę");
                // call showBooks() for update view
                showBooks();
            })
            .fail(function () {
                console.log("Nie dodano książki");
            })
            .always(function () { console.log("Koniec dodawania książki"); }
            );

        if (formAdd.attr("method") == "PUT") {
            formAdd.prop("method", "POST");
            formAdd.find(".btn-primary").text("Dodaj książkę");
            formAdd.slideToggle("fast");
        } else {
            clearForm(formAdd);
        }
    });
});


function clearForm(formAdd) {
    formAdd.find("#id").val("");
    formAdd.find("#title").val("");
    formAdd.find("#author").val("");
    formAdd.find("#publisher").val("");
    formAdd.find("#type").val("");
    formAdd.find("#isbn").val("");
}

// uniwersal ajax call
function ajaxCall(htmlType, id, jsonData) {
    console.log("---ajax data start----");
    console.log(htmlType);
    console.log(id);
    console.log(jsonData);
    console.log("---ajax data end----");
    if (id === undefined) {
        id = "";
    }
    return $.ajax({
        url: url + "books/" + id,
        type: htmlType,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: jsonData,
        dataType: 'json'
    });
}
