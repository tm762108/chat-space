$(function(){
  function buildHTML(message){
    if(message.image){
      var html =
       `<div class="message">
          <div class="main_chat__middle__message_box__upper_info">
            <div class="main_chat__middle__message_box__upper_info__member_name">
              ${message.user_name}
            </div>
            <div class="main_chat__middle__message_box__upper_info__update_time">
              ${message.created_at}
            </div>
          </div>
         <div class="main_chat__middle__message_box__member_message">
           <p class="main_chat__middle__message_box__member_message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
        </div>`
      return html;
    }else {
      var html =
        `<div class="message">
           <div class="main_chat__middle__message_box__upper_info">
             <div class="main_chat__middle__message_box__upper_info__member_name">
               ${message.user_name}
             </div>
             <div class="main_chat__middle__message_box__upper_info__update_time">
               ${message.created_at}
             </div>
           </div>
           <div class="main_chat__middle__message_box__member_message">
             <p class="main_chat__middle__message_box__member_message__content">
               ${message.content}
             </p>
           </div>
         </div>`
    };
      return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: FormData,
      dataType: json,
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
    })
  });
});