
function do_onload_actions()
{
  let imgTag = document.getElementsByTagName("img");
  for (let img of imgTag)
  {
    img.addEventListener("click", function() {
      img.parentNode.removeChild(img);
    });
  }
}
function display_block(block_id)
{
  let div_age = document.getElementById("frm_age_calculator");
  let div_images = document.getElementById("div_image_remover");
  let div_nodes = document.getElementById("div_node_traverser");

  switch(block_id)
  {
    case "frm_age_calculator":
      div_images.style["display"] = "none";
      div_nodes.style["display"] = "none";
      div_age.style["display"] = "block";
      document.getElementById("txt_name").value = "";
      document.getElementById("dt_birthday").value = "";
      document.getElementById("sp_age_answer").innerHTML = "";
      break;
    case "div_image_remover":
      div_age.style["display"] = "none";
      div_nodes.style["display"] = "none";
      div_images.style["display"] = "block";
      break;
    case "div_node_traverser":
      div_age.style["display"] = "none";
      div_images.style["display"] = "none";
      div_nodes.style["display"] = "block";
  }
}
function reveal_age()
{
  let name = document.getElementById("txt_name").value;
  let bday = new Date(document.getElementById("dt_birthday").value);
  let age = calculate_age(bday);
  let response = document.getElementById("sp_age_answer");

  response.innerHTML = name + " is <b>" + age + "</b> years of age.";
}

function calculate_age(dob)
{
  let diff_ms = Date.now() - dob.getTime();
  let age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function traverse_nodes(el)
{
  let result = [];
  let sp_answer_field = document.getElementById("sp_traverse_answer");

  while (el)
  {
    result.push(el.nodeName);
    el = el.parentNode;
  }
  sp_answer_field.innerHTML = "Starting with myself, " +
    " the list of nodes above me are: <br />" + result.toString();
}
