$(function(){
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if(messages.length !== 0){
        var insertHTML = '';
        $.each(messages,function(i, message){
          insertHTML += buildHTML(message)
      });
      $('.main_chat__middle').append(insertHTML);
      $('.main_chat__middle').animate({ scrollTop: $('.main_chat__middle')[0].scrollHeight});
     }
    })
    .fail(function() {
      alert('error');
    });
  };
  function buildHTML(message){
    if(message.image){
      var html =
       `<div class="message" data-message-id=${message.id}>
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
        `<div class="message" data-message-id=${message.id}>
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
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__middle').append(html);
      $('form')[0].reset();
      $('.main_chat__middle').animate({ scrollTop: $('.main_chat__middle')[0].scrollHeight});
      $(".main_chat__bottom__form__send_btn").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});