// const cells = document.querySelectorAll(".cell")
// const pairs = []

function extractDataFromCell(element) {
    let pair = {}
    const childrens = element.children

    const typePairInfo = childrens[0]
    const className = ["lek", "pr", "lab"].find(type => typePairInfo.classList.contains(type)) || "undefined"
    pair["type"] = className

    pair["name"] = childrens[1].innerText
    pair["auditory"] = childrens[2].innerText

    if (childrens.length > 3) {
        const tutor = childrens[3]
        pair["tutor"] = { "name": tutor.innerText, "href": tutor.href }

    }

    return pair

}

// cells.forEach(element => {
//     pairs.push(extractDataFromCell(element))

//     let btn = document.createElement('button')
//     btn.innerHTML = "Delete"
//     btn.classList.add("hide_item_class")
//     element.appendChild(btn)
// });

// console.log(pairs)

// const hideButtons = document.querySelectorAll(".hide_item_class")
// hideButtons.forEach(btn => {
//     btn.addEventListener('click', (event) => {
//         const parent = event.target.parentNode
//         console.log(extractDataFromCell(parent))
//     });
// });


const blocks = document.querySelectorAll("td")
const filtered_blocks = []

blocks.forEach((element, index) => {
    if (element.children.length > 0) {
        //console.log(element, element.children)
        const filtered_data = [...element.children].filter(el => el.classList.contains("cell"))
        if (filtered_data.length > 0) {
            element.setAttribute("data-id", index);
            filtered_blocks.push(element)
        }

        filtered_data.forEach((cell, index) => {
            //cell.setAttribute("data-id", index);
            cell.querySelector(".subject").addEventListener("click", (e) => {
                const target = e.target;
                const targetCell = extractDataFromCell(target.closest(".cell"))
                const parentId = target.closest("td").getAttribute("data-id");
                const newTitle = prompt("Новое название");
                const unpackData = JSON.parse(localStorage.getItem("blocks"))
                const cellID = unpackData[parentId].findIndex(el => el.name === targetCell.name)
                unpackData[parentId][cellID].name = newTitle
                localStorage.setItem("blocks", JSON.stringify(unpackData));
            })
        })
    }

})


if (localStorage.getItem("blocks") === null) {
    const blocksData = {}
    blocks.forEach((element, index) => {
        const blockCells = element.querySelectorAll(".cell")
        const id = element.getAttribute("data-id");
        let blockCellsData = []
        blockCells.forEach((cell, id) => blockCellsData.push(extractDataFromCell(cell)))
        blocksData[id] = blockCellsData
    })
    localStorage.setItem("blocks", JSON.stringify(blocksData));
} else {
    //console.log(filtered_blocks, JSON.stringify(filtered_blocks))
    console.log(JSON.parse(localStorage.getItem("blocks")))
}