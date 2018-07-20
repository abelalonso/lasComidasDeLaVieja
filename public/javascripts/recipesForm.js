window.onload = function(){

  let counterStep = 1;
  let counterIngredient = 1;
  let counterKeyword = 1;
  $("#cancel").hide();

  $('#addIngredient').click(function(ev) {
    ev.preventDefault();
    if (($(`#quantity${counterIngredient-1}`).val()!="") &&
        ($(`#ingredient${counterIngredient-1}`).val()!="")){

      $(this).before(`<div class="ingredient">
                      <input id="quantity${counterIngredient}" 
                            name="quantity"
                            type="text" 
                            class="oneQuantity"
                            placeholder="Cantidad">
                      <input id="ingredient${counterIngredient}" name="ingredient" type="text" 
                      class="oneIngredient"
                      placeholder="Ingrediente ${++counterIngredient}">
                    </div>`);
    }
  });

  $('#addStep').click(function(ev) {
    ev.preventDefault();
    let inbox=$(`#step${counterStep-1}`).val();
    if (inbox !=""){
      
      $(this).before(`<div class='step'>
                        <textarea id="step${counterStep}" 
                        name="step"
                        class="oneStep"
                        placeholder="Paso ${++counterStep}" rows="5"></textarea>
                      </div>`);
    }
  });

  $('#addKeyword').click(function(ev) {
    ev.preventDefault();
    let inbox=$(`#keyword${counterKeyword-1}`).val();
    if (inbox !=""){

      $(this).before(`<div class='keyword'>
                        <input id="keyword${counterKeyword++}" 
                        name="keyword" 
                        class="oneKeyword"
                        placeholder="Palabra Clave">
                      </div>`);
    }
  });

  $('#addIngredientEdit').click(function(ev) {
    ev.preventDefault();
    $(this).before(`<div class="ingredient">
                      <input id="ingredient" name="ingredient" type="text" placeholder="Ingrediente">
                    </div>`); 
  });

  $('#addStepEdit').click(function(ev) {
    ev.preventDefault();
    $(this).before(`<div class='step'>
                      <textarea id="step" 
                      name="step"
                      placeholder="Nuevo paso" rows="5"></textarea>
                    </div>`);
  });

  $('#keyword').click(function(ev) {
    ev.preventDefault();
    $(this).before(`<div class='keyword'>
                      <input id="keyword" 
                      name="keyword" placeholder="Palabra Clave">
                    </div>`);
  });

  $('#changePhoto').click(function(ev) {
    ev.preventDefault();
    $(this).before(`<form id="changePhotoForm" action="/auth/changePhoto" method="POST" enctype="multipart/form-data">
    <input class="btn btn-outline-light" id="photo" name="photo" type="file" >
    <button class="btn btn-primary-light" type="submit">Ok</button>
    </form>`);
    $(this).hide();
    $("#cancel").show();
  });

  $("#cancel").click(function(ev) {
    ev.preventDefault();
    $(this).hide();
    $("#changePhoto").show();
    $("#changePhotoForm").remove();
  });
  


}
