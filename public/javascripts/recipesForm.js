window.onload = function(){

  let counterStep = 1;
  let counterIngredient = 1;
  let counterKeyword = 1;

  $('#addIngredient').click(function(ev) {
    ev.preventDefault();
    if (($(`#quantity${counterIngredient-1}`).val()!="") &&
        ($(`#ingredient${counterIngredient-1}`).val()!="")){

      $(this).before(`<div class="ingredient">
                      <input id="quantity${counterIngredient}" 
                            name="quantity"
                            type="text" 
                            placeholder="Cantidad">
                      <input id="ingredient${counterIngredient}" name="ingredient" type="text" placeholder="Ingrediente${counterIngredient++}">
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
                        placeholder="Paso ${++counterStep}" rows="5"></textarea>
                      </div>`);
    }
  });

  $('#addKeyword').click(function(ev) {
    ev.preventDefault();
    let inbox=$(`#keyword${counterKeyword-1}`).val();
    if (inbox !=""){
/*       $(`#keyword${counterKeyword-1}`)
        .replaceWith(`<label id="keyword${counterKeyword-1}"${inbox}</label>`);  */
      $(this).before(`<div class='keyword'>
                        <input id="keyword${counterKeyword++}" 
                        name="keyword" placeholder="Palabra Clave">
                      </div>`);
    }
  });
}