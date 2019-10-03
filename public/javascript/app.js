$(document).ready(function () {
  $('#scrapeArticles').on('click', function (event) {
    event.preventDefault();
    $.ajax('/api/scrape', {
      method: 'GET'
    }).then(function (response) {
      location.reload();
    });
  });

  $('.saveArticle').on('click', function (event) {
    event.preventDefault();
    let dataset = event.target.dataset;
    let articleId = {
        id: dataset.id
    };
    $.ajax(`/api/save`, {
        method: 'PUT',
        data: articleId
    }).then(function () {
        location.reload();
    });
});

$('.removeArticle').on('click', function (event) {
  event.preventDefault();
  let dataset = event.target.dataset;
  let articleId = {
      id: dataset.id
  };
  $.ajax(`/api/remove`, {
      method: 'PUT',
      data: articleId
  }).then(function () {
      location.reload();
  });
});

$('.addNewNote').on('click', function (event) {
  event.preventDefault();
  let dataset = event.target.dataset;
  let newNote = $(`#${dataset.id}`).val().trim();
  let noteInfo = {
      id: dataset.id,
      note: newNote
  };
  $.ajax(`/api/notes`, {
      method: 'POST',
      data: noteInfo
  }).then(function () {
      location.reload();
  });
});

$('.deleteNote').on('click', function (event) {
  event.preventDefault();
  let dataset = event.target.dataset;
  let noteInfo = {
      id: dataset.note
  };
  $.ajax(`/api/notes`, {
      method: 'DELETE',
      data: noteInfo
  }).then(function() {
      location.reload();
  });
});
  
});