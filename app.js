console.log(window.location)
const cells = document.querySelectorAll(".cell")
const pairs = []

cells.forEach(element=> {
  let pair = {}
  const childrens = element.children

  const typePairInfo = childrens[0]	
  const className = ["lek", "pr", "lab"].find(type => typePairInfo.classList.contains(type)) || "undefined"
  pair["type"] = className

  pair["name"] = childrens[1].innerText
  pair["auditory"] = childrens[2].innerText

  if(childrens.length > 3){
  	const tutor = childrens[3]
  	pair["tutor"] = {"name": tutor.innerText, "href": tutor.href}

  }
  
  pairs.push(pair)
});

console.log(pairs)