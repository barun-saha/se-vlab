var ajax_loading_image = '/cse08/isad/v_media/images/ajax/ajax_loader.gif';

function drawUmlDiagram(strUML) {
    $('img#uml-diagram, img.uml-diagram').attr('src', ajax_loading_image);
    $.ajax({
          type:     'POST',
          url:      '/cse08/isad/isad/uml_dia/',
          data:     { 'diagram': strUML },
          dataType: 'json',
          cache:    false,
          success:    function(mesg, txtStatus, XmlHttpRequest) {
		//alert(mesg)
              //var result = $.parseJSON(mesg);
		var result = mesg;
		//alert(result)
              if (result['error']) {
                  alert('An error was encountered: ' + result['error']);
                  $('img#uml-diagram, img.uml-diagram').attr('src', '/cse08/isad/v_media/images/ajax/8_8_transparent.png');
              }
              else {
                  //alert(result['diagram_url']);
                  var timestamp = new Date().getTime();
                  $('img#uml-diagram, img.uml-diagram').attr('src', result['diagram_url']+'?ts='+timestamp);
                  $('.uml-diagram-container').effect("highlight", {}, 2500);                  
              }
          },
          error:      function(XmlHttpRequet, txtStatus, errorThrown) {
              alert('Failed to draw the UML diagram!!!\n' + errorThrown);
              $('img#uml-diagram, img.uml-diagram').attr('src', '/cse08/isad/v_media/images/ajax/8_8_transparent.png');
          }
    });
}
