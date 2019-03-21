/* js related to dynamic modal */
$(document).on('click','.dmc',function(){
    var that = $(this);
    $('#ahq-modal').modal({backdrop: 'static', keyboard: false});
    waiting();
    default_buttons();
    modal_buttons(that);
    var params = get_parameters(that);
    var arr_params = arr_parameters(that);
    var type = arr_params['type'] ? arr_params['type'] : 'POST';
    var link = arr_params['link'];
    var confirm = $(that).hasClass('confirm');
    if(confirm){
        default_buttons();
        $('#ahq-modal').find('.d').show();
        $(document).on('click','.ahq-d',function(){
            if(link)  ajax_call(link,params,type,arr_params);
        })
    }else{
        if(link)  ajax_call(link,params,type,arr_params);
    }
});

function modal_buttons(elem){
    var c = $(elem).hasClass('c')
    var d = $(elem).hasClass('d')
    var s = $(elem).hasClass('s')
    var lm = $(elem).hasClass('lm')
    resize_modal(lm);
    if(c) $('#ahq-modal').find('.c').show();
    if(d) $('#ahq-modal').find('.d').show();
    if(s) $('#ahq-modal').find('.s').show();
}

function default_buttons(){
    $('#ahq-modal').find('.c').show();
    $('#ahq-modal').find('.d').hide();
    $('#ahq-modal').find('.s').hide();
}

function get_parameters(elem){
    var params ='';
    $.each($(elem).data(), function(key, value) {
        params += '&' + key + '=' + value;
    });
    params = pagination_parameters(params);
    return params+'&_token='+ $("meta[name='csrf-token']").attr('content');
}

function arr_parameters(elem){
    var params =[];
    $.each($(elem).data(), function(key, value) {
        params[key] = value;
    });
    return params;
}

function ajax_call(url,params,type,arr_params){
    $.ajax({
        url:url,
        type:'GET',
        dataType:'json',
        data:params,
        success:function(response){
            reload_modal(response);
            // var callback_function = new Function(arr_params['fn']);
            // callback_function(response);
        },
        error:function(response){
            $('#ahq-m-b').html('<div class="error">'+response.responseText+'</div');
        }
        
    })
}

function reload_modal(response){
    $('#ahq-m-b').html(response.message);
}

function successfn(r){
    console.log(r);
}

function waiting(){
    var flash = $(document).find('.flash');
    $(flash).removeClass('alert alert-danger alert-success');
    $(flash).html('');
    $('#ahq-m-b').html('<div class="ahq-spinner"></div>');
}

function modal_submit(){
    var form = $('#ahq-m-b').find('form');
    var url = $(form).attr('action');
    var type = $(form).attr('method');
    var redirect = $(form).data('redirect');
    var params = $(form).serializeArray();
    var files = get_images(form);
    params.push([{files}]);
    console.log(params);
    $.ajax({
        url:url,
        type:type,
        dataType:'json',
        data:params,
        success:function(response){
            if(response.state=='success'){
                if(redirect){
                    $('#ahq-m-b').html('<div class="ahq-spinner"></div');
                    window.location.href = response.url;                    
                }else{
                    $('#ahq-m-b').html(response.message);
                }
            }else{
                var flash = $('.flash');
                $(flash).addClass('alert alert-danger');
                $(flash).html(response.message);
            }
        }

    })
}

function get_images(elem){
    var images = [];
    $(elem).find('.mi-h img').each(function(){console.log($(this).attr('src')); /* modal image holder mi-h*/
      images.push($(this).attr('src'));
    })
    return images;
  }

$(document).on('click','.ahq-s',function(){
    modal_submit();
    finish();
})

function finish(){
    $('#ahq-modal').find('.d').hide();
    $('#ahq-modal').find('.s').hide();
}

function resize_modal(l){
    if(l){
        $(document).find(".modal-content").attr('style',"width:900px;left:-20%;");
    }else{
        $(document).find(".modal-content").attr('style',"width:600px");
    }

}

function pagination_parameters(params){
    $(document).find('.fp').each(function(){
        params += '&' + $(this).attr('name') + '=' + $(this).val();
    })
    return params;
}

/* /default modal end */


/* btf button to toggle filter with class tf */
$(document).on('click','.btf',function(){
    $(document).find('.btf').toggle();
    $(document).find('.tf').toggle();
})

/* rf = run filter button */
$(document).on('click','.rf',function(){
    var url = $('input[name="current_url"]').val();
    var params = pagination_parameters('url='+url);
    $.ajax({
        url:url,
        type:'GET',
        dataType:'json',
        data:params,
        success:function(response){
            if(response.state=='success'){
                    $('#ahq-m-b').html(response.message);
            }else{
                var flash = $('.flash');
                $(flash).addClass('alert alert-danger');
                $(flash).html(response.message);
            }
        }

    })
})

/* pagination */

$(document).on('click', '.pagination .page-link', function(e) {
    e.preventDefault();
    if (e.isDefaultPrevented()) {
        waiting();
        var url = $(this).attr('href');
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                $('#ahq-m-b').html(response.message);
            },
        });
    } else {
        e.returnValue = false;
    }
})


/* typeahead */
$(document).ready(function(){
    $(".typeahead").select2({
        ajax: {
            dataType: 'json',
            type: "GET",
            delay: 250,
            data: function (params) {
                return { name: params.term };
            },
            processResults: function (data) {
                return { results: data.output };
            },
            url : function(){
                return this.data('url');
            }
        },
        placeholder: function(){
            return this.data('placeholder');
        },
      });

});
