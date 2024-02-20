$(document).ready(function() {

    showLoader();
    /** Mở ứng dụng */
    $("#bi-search").click(function() {
        $("#top_search").slideDown(500);
        $("#news").fadeTo("slow", 0.2);
        $("#content").fadeTo("slow", 0.2);
    });

    $("#closed").click(function() {
        $("#top_search").hide();
        $("#news").fadeTo("slow", 1);
        $("#content").fadeTo("slow", 1);
    })

    $("#search").click(function() {
        $("#top_search").slideUp();
        $("#news").fadeTo("slow", 1);
        $("#content").fadeTo("slow", 1);
    })

    $("#from_date").val(new Date().toISOString().slice(0,10));
    $("#from_to").val(new Date().toISOString().slice(0, 10));

    /** lấy dữ liệu */
    var tokenAPI =  "b597d09f80ed3f094abec09025ecb02e";
    var urls = "https://gnews.io/api/v4/search?q=example&token=" + tokenAPI;

    fetch(urls)
    .then(function (response) {
        hideLoader();
      return response.json();
    })
    .then(function (posts) {
        var htmls = posts.articles.map(function(post) {
            return `
            <div class="container-fluid">
                <div class="card mb-3" style="max-width: 100%;" >
                    <article class="row g-0" > 
                        <figure class="col-md-4">
                            <img src="${post.image}" class="img-fluid rounded-start" alt="...">
                        </figure>
                        <figcaption class="col-md-8">
                            <div class="card-body">
                                <a href="${post.url}" target="_blank">${post.title}</a>
                                <p class="card-text"><small class="text-muted">${post.description}</small></p>
                                <p class="card-text">${post.publishedAt}</p>
                            </div>
                        </figcaption>
                    </article>
                </div>
            </div>`
        });
        var html = htmls.join('');

     $("#content").append(html);
    });

    // Search 
    $("#search").click(function() {

        showLoader();

        var keywords = $('#keywords-search').val();
        var dateFrom = $('#from-date').val();
        var dateTo = $('#from-to').val();
        var from = new Date(dateFrom).toISOString().replace(".000", "");
        var to = new Date(dateTo).toISOString().replace(".000", "");    
        var urls =
          'https://gnews.io/api/v4/search?q=' + keywords + '&from=' + from + '&to=' + to + '&max=10&lang=en&token=18e56b288adafefa3b957acd9ce5d82e';
        fetch(urls, {
          method: "GET",
        })
        .then(function (response) {
            hideLoader();

            return response.json();
        })

        var dulieu2 = "";
        $.each(data2.articles, function (idx, post) {
          dulieu2 += `
          <div class="container-fluid">
              <div class="card mb-3" style="max-width: 100%;" >
                  <article class="row g-0" > 
                      <figure class="col-md-4">
                          <img src="${post.image}" class="img-fluid rounded-start" alt="...">
                      </figure>
                      <figcaption class="col-md-8">
                          <div class="card-body">
                              <a href="${post.url}">${post.title}</a>
                              <p class="card-text"><small class="text-muted">${post.description}</small></p>
                              <p class="card-text">${post.publishedAt}</p>
                          </div>
                      </figcaption>
                  </article>
              </div>
          </div>`
        });

        $("#content").html(dulieu2);
    });

    function showLoader() {
        $('#loader').removeClass('hidden');
      };
      function hideLoader() {
        $('#loader').addClass('hidden');
      };
});



